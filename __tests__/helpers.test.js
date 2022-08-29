const {format_date} = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2022-08-29 11:33:00');

    expect(format_date(date)).toBe('8/29/2022');
});