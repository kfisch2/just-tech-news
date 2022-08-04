const {format_date} = require('../utils/helpers');
const {format_plural} = require('../utils/helpers');
const {format_url} = require('../utils/helpers');

test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_date(date)).toBe('3/20/2020')
});


test('format_plural returns pluralized word if greater than 1', () => {
  const word = 'Lion';
  const num = 2;

  const word2 = 'Tiger';
  const num2= 1

  expect(format_plural(word, num)).toBe('Lions');
  expect(format_plural(word2, num2)).toBe('Tiger');
});

test('format_url() returns simplified url string', () => {
  const url1 = format_url('http://test.com/page/1');
  const url2 = format_url('https://www.coolstuff.com/abcdgeadfsf');
  const url3 = format_url('https://www.google.com?q=hello');

  expect(url1).toBe('test.com');
  expect(url2).toBe('coolstuff.com');
  expect(url3).toBe('google.com');
})