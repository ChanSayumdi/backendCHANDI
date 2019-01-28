const tables = {

    role: {
        createTable: "CREATE TABLE role(" +
            "roleId varchar(10)," +
            "roleName	varchar(20)," +
            "CONSTRAINT pk_role PRIMARY KEY (roleId))",
        adduser: "INSERT INTO role (roleId,roleName) VALUE ?",
        getUser: "SELECT * FROM role where ?"
    },

    users: {
        createTable: "CREATE TABLE users (" +
            " NIC VARCHAR(15)," +
            " firstName VARCHAR(255)," +
            "lastName VARCHAR(255)," +
            " contactNo INT(10)," +
            "email VARCHAR(255)," +
            "password VARCHAR(32)," +
            "addNo VARCHAR(255)," +
            "addStreet VARCHAR(255)," +
            " addCity VARCHAR(255)," +
            "roleId varchar(10)," +
            "CONSTRAINT pk_users PRIMARY KEY (NIC)," +
            "CONSTRAINT fk_users_role FOREIGN KEY (roleId) REFERENCES role(roleId) ON DELETE CASCADE)",
        adduser: "INSERT INTO users(NIC,firstName,lastName,contactNo,email,password,addNo,addStreet,addCity,roleId) VALUE ?",
        getUser: "SELECT * FROM users where ?"
    },

    mlt: {
        createTable: "CREATE TABLE mlt (" +
            "mltRegNo varchar(10)," +
            "NIC VARCHAR(15)," +
            "CONSTRAINT pk_mlt PRIMARY KEY (mltRegNo)," +
            "CONSTRAINT fk_mlt_users FOREIGN KEY (NIC) REFERENCES users(NIC) ON DELETE CASCADE)",
        adduser: "INSERT INTO mlt(NIC,mltRegNo)VALUE ?",
        getUser: "SELECT * FROM mlt where ?"
    },

    patient: {
        createTable: "CREATE TABLE patient (" +
            "patientId VARCHAR(15)," +
            "dob DATE," +
            "occupation VARCHAR(50)," +
            "bloodType VARCHAR(10)," +
            "maritalState BOOLEAN," +
            " height DECIMAL(5,2)," +
            "weight DECIMAL(5,2)," +
            " NIC VARCHAR(15)," +
            "CONSTRAINT pk_patient PRIMARY KEY (patientId)," +
            "CONSTRAINT fk_patient_users FOREIGN KEY (NIC) REFERENCES users(NIC) ON DELETE CASCADE)",
        adduser: "INSERT INTO patient(patientId,dob,occupation,bloodType,maritalState,height,weight,NIC)VALUE ?",
        getUser: "SELECT * FROM patient where ?"
    },


    doctor: {
        createTable: "CREATE TABLE doctor (" +
            " doctorRegNo VARCHAR(15)," +
            "doctorField VARCHAR(30)," +
            "doctorDesignation VARCHAR(50)," +
            "  workAddress VARCHAR(50)," +
            " NIC VARCHAR(15)," +
            " CONSTRAINT pk_doctor PRIMARY KEY (doctorRegNo)," +
            "CONSTRAINT fk_doctor_users FOREIGN KEY (NIC) REFERENCES users(NIC) ON DELETE CASCADE )",

        adduser: "INSERT INTO doctor(doctorRegNo,doctorField,doctorDesignation,workAddress,NIC)VALUE ?",
        getUser: "SELECT * FROM doctor where ?"
    },

    frontdesk: {
        createTable: "CREATE TABLE frontdesk(" +
            "NIC varchar(15)," +
            "frontDeskId varchar(20)," +
            "CONSTRAINT pk_frontdesk PRIMARY KEY (frontDeskId)," +
            "CONSTRAINT fk_frontdesk_users FOREIGN KEY (NIC) REFERENCES users(NIC) ON DELETE CASCADE)",

        adduser: "INSERT INTO frontdesk (NIC,frontDeskId) VALUE ?",
        getUser: "SELECT * FROM frontdesk where ?"
    },

    patientbasichealthinfo: {
        createTable: "CREATE TABLE patientbasichealthinfo(" +
            " patientId VARCHAR(15)," +
            " currentDate DATE," +
            "cholestorol DECIMAL(5,2)," +
            " socialDisease VARCHAR(75)," +
            " allergy VARCHAR(75)," +
            " bloodPresure DECIMAL(5,2)," +
            "bloodSugar DECIMAL(5,2)," +
            " CONSTRAINT pk_patientbasichealthinfo PRIMARY KEY ()," +
            " CONSTRAINT fk_patientbasichealthinfo_patient FOREIGN KEY (patientId) REFERENCES patient(patientId) ON DELETE CASCADE )",

        adduser: "INSERT INTO patientbasichealthinfo( patientId,currentDate,cholestorol,socialDisease,allergy,bloodPresure,bloodSugar)VALUE ?",
        getUser: "SELECT * FROM patientbasichealthinfo where ?"
    },

    labreport: {
        createTable: "CREATE TABLE labreport(" +
            " reportNo INT(100)," +
            "reportName VARCHAR(50)," +
            "  pdfLocation VARCHAR(100)," +
            "CONSTRAINT pk_labreport PRIMARY KEY(reportNo)",

        adduser: "INSERT INTO labreport(reportNo,reportName,pdfLocation)VALUE ?",
        getUser: "SELECT * FROM  labreport where ?"
    },
    

    diseasedetail:{ 
        createTable:"CREATE TABLE diseasedetail("+
       " diseaseDetailId VARCHAR(100),"+
       " diseaseDescription VARCHAR(100),"+
        "reportAssign VARCHAR(100),"+
        "diseaseDate DATE,"+
       " CONSTRAINT pk_diseasedetail PRIMARY KEY(diseaseDetailId)",

       adduser: "INSERT INTO diseasedetail(diseaseDetailId,diseaseDescription,reportAssign,diseaseDate)VALUE ?",
       getUser: "SELECT * FROM diseasedetail where ?"
},

prescription:{
    createTable:"CREATE TABLE prescription ("+
        "prescriptionId VARCHAR(15)," +
       " issueDate DATE,"+
       " expireDate DATE,"+
       " madicineName VARCHAR(100),"+
       " doctorRegNo VARCHAR(50),"+
       " diseaseDetailId VARCHAR(100),"+
       " recommandedTest VARCHAR(200),"+
       " CONSTRAINT pk_prescription PRIMARY KEY (prescriptionId),"+
       " CONSTRAINT fk_prescription_doctor FOREIGN KEY(doctorRegNo) REFERENCES doctor(doctorRegNo) ON DELETE CASCADE )"+
       "CONSTRAINT fk_prescription_diseasedetail FOREIGN KEY(diseaseDetailId) REFERENCES diseasedetail(diseaseDetailId) ON DELETE CASCADE )",

        adduser:"INSERT INTO prescription(prescriptionId,issueDate,expireDate,madicineName,doctorRegNo,diseaseDetailId,recommandedTest)VALUE ?",
        getUser: "SELECT * FROM prescription where ?"
},
   
    

    appointment: {
        createTable: "CREATE TABLE appointment("+
           " appId VARCHAR(15),"+
            "appDate DATE,"+
            "appTime TIME,"+
            "appStatus VARCHAR(100),"+
            "patientId VARCHAR(15),"+
            "doctorRegNo VARCHAR(15),"+
           " CONSTRAINT pk_appointment PRIMARY KEY(apptId)"+
           " CONSTRAINT fk_appointment_patient FOREIGN KEY(patientId) REFERENCES patient(patientId) ON DELETE CASCADE )"+
           " CONSTRAINT fk_appointment_doctor FOREIGN KEY(doctorRegNo) REFERENCES doctor (doctorRegNo) ON DELETE CASCADE )",

        adduser:" INSERT INTO appointment(appId,appDate,appTime,appStatus,patientId,doctorRegNo)VALUE ?",
        getUser: "SELECT * FROM appointment where ?"

       },
       appSchedule:{
         createTable: "CREATE TABLE appSchedule ("+
            " appScheduleId,"+
             "noOfAppointments,"+
             "dateTimeIn,"+
             "dateTimeOut,"+
             "doctorRegNo,"+
             " CONSTRAINT pk_appSchedule PRIMARY KEY (appScheduleId)"+
             "CONSTRAINT fk_appSchedule_doctor FOREIGN KEY(doctorRegNo) REFERENCES doctor(doctorRegNo) ON DELETE CASCADE)",

          adduser:" INSERT INTO appSchedule(appScheduleId,noOfAppointments,dateTimeIn,dateTimeOut,doctorRegNo)VALUE ?",
          getUser: "SELECT * FROM appSchedule where ?"
        },

        medicine:{
            createTable:  "CREATE TABLE medicine ("+
               " madicineName VARCHAR(100),"+
                " medicineNo VARCHAR(50),"+
              " CONSTRAINT pk_medicineNo PRIMARY KEY (medicineNo))",
           
              adduser:" INSERT INTO medicine (madicineName, medicineNo)VALUE?",
            
        },
      
         
          


       

    /*userData :{
        createUserTable :"CREATE TABLE users (DOB date,MsgFlag boolean DEFAULT 0,NotificationFlag boolean DEFAULT 0,Email varchar(50),UserID char(10),ContactNo char(10),password varchar(100),AddStreet varchar(50),AddCity varchar(50),AddNo varchar(10),FirstName varchar(20),LastName varchar(20),MiddleName varchar(20),role varchar(10),CONSTRAINT PK_user PRIMARY key(UserID))",
        insertIntoUserTable : "insert into users(DOB,Email,UserID,ContactNo,password,AddStreet,AddCity,AddNo,FirstName,LastName,MiddleName,role) values ?",
        SelectUser : 'SELECT * from users WHERE UserID =',
        deleteUser: 'DELETE FROM users WHERE UserId = ',
    },

    users :{
        createTable :'CREATE TABLE users ('+
            'DOB date,'+
            'MsgFlag boolean DEFAULT 0,'+
            'NotificationFlag boolean DEFAULT 0,'+
            'Email varchar(50),'+
            'UserID char(10),'+
            'ContactNo char(10),'+
            'password varchar(100),'+
            'AddStreet varchar(50),'+
            'AddCity varchar(50),'+
            'AddNo varchar(10),'+
            'FirstName varchar(20),'+
            'LastName varchar(20),'+
            'MiddleName varchar(20),'+
            'role varchar(10),'+
            'CONSTRAINT PK_user PRIMARY key(UserID))',
        insertIntoTable : "insert into users(DOB,Email,UserID,ContactNo,password,AddStreet,AddCity,AddNo,FirstName,LastName,MiddleName,role) values ?",
        SelectUser : 'SELECT * from users WHERE UserID ='
    },

    guardian:{
        createTable:"create table guardian("+
            'DOB date,'+
            'MsgFlag boolean DEFAULT 0,'+
            'NotificationFlag boolean DEFAULT 0,'+
            'Email varchar(50) UNIQUE,'+
            'username char(30) UNIQUE,'+
            'password varchar(100),'+
            'ContactNo char(10),'+
            'AddStreet varchar(50),'+
            'AddCity varchar(50),'+
            'AddNo varchar(10),'+
            'FirstName varchar(20),'+
            'LastName varchar(20),'+
            'MiddleName varchar(20),'+
            'guardianNIC varchar(10),'+
            'CONSTRAINT pk_guardian PRIMARY key(guardianNIC))',

        insertIntoTable:'insert into guardian(DOB,Email,username,ContactNo,password,AddStreet,AddCity,AddNo,FirstName,LastName,MiddleName,guardianNIC) values ?',
        SelectUser :'SELECT * from guardian WHERE username ='
    },

    student:{
        createTable:'CREATE TABLE Student('+
            'UserId varchar(10),'+
            'CardId varchar(10) UNIQUE,'+
            'FeeType varchar(6),'+
            'School varchar(50),'+
            'CONSTRAINT pk_student PRIMARY KEY (UserId),'+
            'CONSTRAINT fk_student FOREIGN KEY (UserId) REFERENCES users( UserId) ON DELETE CASCADE)',
            
    insertIntoTable :'insert into Student(UserId,CardId,FeeType,School)values ?',
    findStudentWithoutCard:'SELECT UserId FROM `Student` WHERE CardId is null',
    setCardId : "UPDATE Student SET CardId = ? WHERE UserId = ?",
    selectStudentRelevantToNuid :"SELECT UserId FROM `Student` WHERE CardId = ?"
    },

    guardianstudent:{
        createTable:"create table guardianStudent("+
            "guardianNIC varchar(10),"+
            "UserId varchar(10),"+
            "CONSTRAINT pk_gurdianStudent PRIMARY key(guardianNIC,UserId),"+
            "CONSTRAINT fk_guardianStudent_student FOREIGN KEY (UserId) REFERENCES users( UserId) ON DELETE CASCADE)",

        insertIntoTable:'insert into guardianStudent(guardianNIC,UserId) values ?',
        selectStudents:'SELECT UserId FROM `guardianStudent` WHERE guardianNIC = '
    },

    device:{
        createTable: "create table device(" +
            "DeviceId      varchar(10),"+
            "locationID    varchar(10),"+
            "type          varchar(10),"+
            "CONSTRAINT pk_device PRIMARY key(DeviceId),"+
            "CONSTRAINT fk_device_locations FOREIGN KEY (locationID) REFERENCES locations( locationID) ON DELETE CASCADE)",
        insertIntoTable :"INSERT INTO device(DeviceId,locationID,type) VALUES ?"
    },
    locations:{
        createTable :"create  table locations("+
            "locationID    varchar(10),"+
            "locationName  varchar(20),"+
            "CONSTRAINT pk_locations PRIMARY key(locationID))",
        insertIntoTable : "INSERT INTO locations (locationID,locationName) VALUES ?"
    },
    subjects:{
        createTable:"create table subjects("+
            "subjectName   varchar(20),"+
            "subjectID     varchar(10),"+
            "CONSTRAINT pk_subjects PRIMARY key(subjectID))",
        insertIntoTable : "INSERT INTO subjects (subjectName,subjectID) VALUES ?",
        getSubject :"Select * from subjects"
    },

    classes:{
        createTable: "create table classes ("+
            "ClassID    varchar(10),"+
            "subjectID	varchar(10),"+
            "locationID	varchar(10),"+
            "teacherID   varchar(10),"+
            "dateOfWeek  int,"+
            "halfFee     decimal(7,2),"+
            "fullFee     decimal(7,2),"+
            "startTime   time,"+
            "endTime     time,"+
            "description varchar(50),"+
            "CONSTRAINT pk_classes           PRIMARY key(ClassID),"+
            "CONSTRAINT fk_classes_teacher   FOREIGN KEY (teacherID)   REFERENCES users( UserId)         ON DELETE CASCADE,"+
            "CONSTRAINT fk_classes_subjects  FOREIGN KEY (subjectID)   REFERENCES subjects(subjectID)    ON DELETE CASCADE,"+
            "CONSTRAINT fk_classes_locations FOREIGN KEY (locationID)  REFERENCES locations(locationID)  ON DELETE CASCADE)",
        insertIntoTable:"insert INTO classes (ClassID,subjectID,locationID,teacherID,dateOfWeek,halfFee,fullFee,startTime,endTime,description) VALUES ?",
        SelectClassWithDeviceId:"SELECT * FROM classes WHERE locationID IN (SELECT locationID FROM device WHERE DeviceId = ?) AND dateOfWeek = ?",
        deleteClass :"DELETE FROM classes WHERE ClassID = ?",
        selectAllCalssesInfo:"SELECT * FROM classes",
    },
    studentclass:{
        createTable:"create table studentClass("+
            "UserID    varchar(10),"+
            "ClassID   varchar(10),"+
            "CONSTRAINT pk_studentClass             PRIMARY key(ClassID,UserID),"+
            "CONSTRAINT fk_studentClass_users    FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE,"+
            "CONSTRAINT fk_studentClass_classes  FOREIGN KEY (ClassID) REFERENCES classes(ClassID) ON DELETE CASCADE)",
        insertIntoTable:"INSERT INTO studentClass (UserID,ClassID) VALUES ?",
        selectStudentEnrolledSubjects :"SELECT * FROM studentClass WHERE UserID = ?",
    },
    attendance: {
        createTable : "create table Attendance("+
            "DeviceId	varchar(10),"+
            "UserId		varchar(10),"+
            "ClassId		varchar(10),"+
            "atDate		date,"+
            "InTime		time,"+
            "outTime   time,"+
            "CONSTRAINT pk_Attendance PRIMARY  key(atDate,UserId,ClassId,InTime),"+
            "CONSTRAINT fk_Attendance_student  FOREIGN KEY (UserId)   REFERENCES users( UserId)      ON DELETE CASCADE,"+
            "CONSTRAINT fk_Attendance_device   FOREIGN KEY (DeviceId)  REFERENCES device(DeviceId)   ON DELETE CASCADE,"+
            "CONSTRAINT fk_Attendance_classes  FOREIGN KEY (ClassId)  REFERENCES classes(ClassId)    ON DELETE CASCADE)",
            insertIntoTable : "INSERT INTO Attendance (DeviceId,UserId,ClassId,atDate,InTime) VALUES ?",
            getAttendance : "SELECT"
    },
    fee:{
        createTable :"create table fee("+
            "StudentId    varchar(10),"+
            "OfficeuserId varchar(10),"+
            "ClassID   varchar(10),"+
            "atDate    date,"+
            "amount    decimal(7,2),"+
            "CONSTRAINT pk_studentClass             PRIMARY key(ClassID,StudentId,atDate),"+
            "CONSTRAINT fk_fee_users_student   FOREIGN KEY (StudentId) REFERENCES users(UserID) ON DELETE CASCADE,"+
            "CONSTRAINT fk_fee_users_officeuser   FOREIGN KEY (OfficeuserId) REFERENCES users(UserID) ON DELETE CASCADE,"+
            "CONSTRAINT fk_fee_classes  FOREIGN KEY (ClassID) REFERENCES classes(ClassID) ON DELETE CASCADE)"
    },
    mark:{
        createTable :"create table mark("+
            "UserId    varchar(10),"+
            "ClassID   varchar(10),"+
            "atDate    date,"+
            "marks     int,"+
            "description varchar(100),"+
            "CONSTRAINT pk_mark             PRIMARY key(ClassID,UserId,atDate),"+
            "CONSTRAINT fk_mark  FOREIGN KEY (UserId) REFERENCES users(UserID) ON DELETE CASCADE,"+
            "CONSTRAINT fk_pk_mark_classes  FOREIGN KEY (ClassID) REFERENCES classes(ClassID) ON DELETE CASCADE)"
    },
    notice:{
        createTable:"create table notice(" +
                "UserId    varchar(10),"+
                "ClassID   varchar(10),"+
                "atDate    date,"+
                "atTime    time,"+
                "title    varchar(50),"+
                "msg       varchar(100),"+
                "CONSTRAINT pk_notice              PRIMARY key(ClassID,UserId,atDate,atTime),"+
                "CONSTRAINT fk_notice              FOREIGN KEY (UserId)    REFERENCES users(UserID)    ON DELETE CASCADE,"+
                "CONSTRAINT fk_notice_classes      FOREIGN KEY (ClassID)   REFERENCES classes(ClassID) ON DELETE CASCADE)",
        insertIntoTable :"INSERT INTO notice (UserId,ClassID,atDate,atTime,title,msg) VALUES ?",
        getnotice : "SELECT * FROM notice"
    },
    multiTableQuerry : {
        SearchClassIDWithDeviceIdUserIDTime : "SELECT classID FROM studentClass WHERE ClassID IN (SELECT ClassID FROM classes WHERE locationID IN (SELECT locationID FROM device WHERE DeviceId = ?) AND dateOfWeek = ? AND startTime BETWEEN ? AND ?) AND UserID = ?"
    }*/
}

module.exports.tables = tables;

module.exports.tablesname = [
    'role',
    'users',
    'mlt',
    'patient',
    'doctor',
    'frontdesk',
    'patientbasichealthinfo',
    'labreport',
    'diseasedetail',
    'appointment',
    'prescription',
    'appSchedule',
    

    /*'users',
    'student',
    'guardian',
    'guardianstudent',
    'locations',
    'subjects',
    'device',
    'classes',
    'studentclass',
    'attendance',
    'fee',
    'notice',*/
];