import { DateTimeConverter } from './datetimeconverter';

let invalidZoneOffsetErrorMessage: string = 'zone off set value is invalid, the correct format is +/-HH:MM example between -12:00 & +14:00';
let invalidDateFormat: string = 'input date string is not a ISO date string';

describe('DateTimeConverter tests', () => {

    test('Expect datetime converter to add offset isodatestring input', async () => {
        expect(DateTimeConverter.convertUTCDateTimeStringToLocalDate('2022-01-31T07:28:05.888Z', '-05:30', false)).toEqual("2022-01-31T01:58:05.888Z");
    });

    test('Expect datetime converter to add offset isodatestring input, with daylight saving ', async () => {
        expect(DateTimeConverter.convertUTCDateTimeStringToLocalDate('2022-01-31T07:28:05.888Z', '-05:30', true)).toEqual("2022-01-31T02:58:05.888Z");
    });

    test('Expect datetime converter to add offset isodatestring input', async () => {
        expect(DateTimeConverter.convertUTCDateTimeStringToLocalDate('2022-01-31T07:28:05.888Z', '-00:00', false)).toEqual("2022-01-31T07:28:05.888Z");
    });

    test('Expect datetime converter to add handle daylight saving only when offset is valid', async () => {
        expect(DateTimeConverter.convertUTCDateTimeStringToLocalDate('2022-01-31T07:28:05.888Z', undefined, true)).toEqual("2022-01-31T07:28:05.888Z");
    });


    test('Expect datetime converter to to throw ex exception for invalid utc format date string', async () => {
        expect(() => {
            DateTimeConverter.convertUTCDateTimeStringToLocalDate('2022-01-31T07:28:05.888', undefined, true)
        }).toThrow("input date string is not a ISO date string");
    });

    test('Expect datetime converter to to throw ex exception for invalid utc format date string', async () => {
        expect(() => {
            DateTimeConverter.convertUTCDateTimeStringToLocalDate('2022-01-3107:28:05.888Z', undefined, true)
        }).toThrow("input date string is not a ISO date string");
    });

    test('Expect datetime converter to to throw ex exception for invalid utc format date string', async () => {
        expect(() => {
            DateTimeConverter.convertUTCDateTimeStringToLocalDate('2022-01-31T07:8:05.888Z', undefined, true)
        }).toThrow("input date string is not a ISO date string");
    });

    test('Expect datetime converter to to throw ex exception for invalid offset', async () => {
        expect(() => {
            DateTimeConverter.convertUTCDateTimeStringToLocalDate('2022-01-31T07:28:05.888Z', "6:90", true)
        }).toThrow("zone off set value is invalid, the correct format is +/-HH:MM example between -12:00 & +14:00");
    });

});