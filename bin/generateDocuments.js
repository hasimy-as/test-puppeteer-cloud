const fs = require('fs');
const moment = require('moment');
const mustache = require('mustache');
const puppeteer = require('puppeteer');
const validate = require('validate.js');

const minio = require('../database/minio');
const { CODE } = require('../utils/commons');
const response = require('../utils/response');

const generateDocuments = async (req, res) => {
  const payload = {
    companyName: 'PT. Dummy Indonesia',
    companyPIC: {
      name: 'Hasimy Md',
      position: 'Chief Technology Officer'
    },
    email: 'admin@dummy.id',
    phoneNumber: '081234567890',
    address: 'Jalan 123, Jakarta Pusat, DKI Jakarta 10110',
    currentDay: moment(new Date()).locale('id').format('dddd'),
    dateTime: moment(new Date()).locale('id').format('D MMMM YYYY'),
  };

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const templateContract = fs.readFileSync('./bin/dummyFile.html', 'utf8');

  const html = mustache.to_html(templateContract, { ...payload });
  await page.setContent(html);
  const docBuffer = await page.pdf();
  await page.close();
  await browser.close();

  return await uploadDocument(req, res, docBuffer);
}

const uploadDocument = async (req, res, docBuffer) => {
  try {
    if (validate.isEmpty(docBuffer)) {
      return response.error(res, 'Buffer cannot be empty!', CODE.NOT_FOUND);
    }

    const result = await minio.putObject('mokletdev-minio', 'company-thing.pdf', docBuffer);

    return response.data(res, result, 'Document has been uploaded.', CODE.SUCCESS)
  }

  catch (err) {
    console.log(err)
    return response.error(res, 'Fail to upload document!', CODE.INTERNAL_ERROR)
  }
};

module.exports = {
  generateDocuments
};
