const {format_date} = require('../utils/helpers');
const {format_plural} = require('../utils/helpers');
const {format_url} = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2022-08-29 11:33:00');

    expect(format_date(date)).toBe('8/29/2022');
});

test('format_plural() returns a pluralized word', () => {
    const plural = format_plural("tiger", 2);

    expect(plural).toBe("tigers");
});

test('format_url() returns a simplified url string', () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
});