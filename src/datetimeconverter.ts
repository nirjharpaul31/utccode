export class DateTimeConverter {

    private static HOUR_IN_MS: number = 3600000;
    private static MINUTES_IN_MS: number = 60000;

    //error messages
    private static invalidZoneOffsetErrorMessage = 'zone off set value is invalid, the correct format is +/-HH:MM example between -12:00 & +14:00';
    private static invalidDateFormat = 'input date string is not a ISO date string';

    //iso date regex
    private static isoDateRegExp = new RegExp(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/);

    /**
     * 
     * @param inputUtcDateTimeStr 
     * @param zoneOffSet 
     * @param dayLightSaving 
     * @returns 
     */
    public static convertUTCDateTimeStringToLocalDate(inputUtcDateTimeStr: string, zoneOffSet: undefined | string, dayLightSaving: boolean): string {

        if (!this.isISODateTimeString(inputUtcDateTimeStr)) {
            throw new Error(this.invalidDateFormat);
        }

        let passedDate = new Date(inputUtcDateTimeStr);
        let passedTime = passedDate.getTime();
        let totalOffset = 0;
        let symbol = '';

        if (zoneOffSet) {
            let symbol = zoneOffSet.substring(0, 1);
            totalOffset = this.calcuclateOffset(zoneOffSet);
            if (symbol === '-') {
                passedTime = passedTime - totalOffset;
            } else if (symbol === '+') {
                passedTime = passedTime + totalOffset;
            }
            
            //handle daylight saving add one hour in ms 
            if (dayLightSaving === true) {
                passedTime = passedTime + this.HOUR_IN_MS;
            }
        }

        let localDatetime = new Date(passedTime);
        return localDatetime.toISOString();
    }

    /**
     * this function is being used to convert utc offset to ms
     * @param zoneOffSet any string with symbol -12:00 to +14:00
     * @returns 
     */
    private static calcuclateOffset(zoneOffSet: string) {
        //validate
        if (!(zoneOffSet.startsWith('-') || zoneOffSet.startsWith('+'))) {
            throw new Error(this.invalidZoneOffsetErrorMessage);
        }
        let hour = parseInt(zoneOffSet.substring(1, 3));
        let minutes = parseInt(zoneOffSet.substring(4));

        let totalOffset = hour * this.HOUR_IN_MS + minutes * this.MINUTES_IN_MS;
        return totalOffset;
    }

    /**
     * validate the format of the input string
     * @param inputString input ISODateTime string
     * @returns 
     */
    private static isISODateTimeString(inputString: string): boolean {
        return this.isoDateRegExp.test(inputString);
    }

}


