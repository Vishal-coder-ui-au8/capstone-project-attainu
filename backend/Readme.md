EduManage BackEnd

https://edumanageapp.herokuapp.com/

Authentication

POST https://edumanageapp.herokuapp.com/user/register

POST https://edumanageapp.herokuapp.com/user/login

GET https://edumanageapp.herokuapp.com/user/list

Timetable

GET https://edumanageapp.herokuapp.com/ttable/list?std=first -
https://edumanageapp.herokuapp.com/ttable/list?std=first&day=Mon

PUT https://edumanageapp.herokuapp.com/ttable/update/4

Fees

GET https://edumanageapp.herokuapp.com/fees/defaulters

GET https://edumanageapp.herokuapp.com/fees/getDetail?std&name

PUT https://edumanageapp.herokuapp.com/fees//editdefaulter/:id

Admission

GET https://edumanageapp.herokuapp.com/admission/list

POST https://edumanageapp.herokuapp.com/admission/upload

DELETE https://edumanageapp.herokuapp.com/delete

Payroll

GET https://edumanageapp.herokuapp.com/staff/paydetail

POST https://edumanageapp.herokuapp.com/staff/add
