import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { LoginService } from '../../services/login.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-register-students',
  templateUrl: './register-students.component.html',
  styleUrls: ['./register-students.component.css']
})
export class RegisterStudentsComponent implements OnInit {
  students = [];
  fileReader: FileReader;
  studentsReadFromFile;

  constructor(private studentsService: StudentsService, private auth: LoginService) {
    this.fileReader = new FileReader();
    this.fileReader.onload = this.handleFileRead.bind(this);
  }

  ngOnInit() {
    this.getStudents();
  }

  async getStudents() {
    try {
      const req = await this.studentsService.getAllStudents(this.auth.token);
      this.students = req.students;
    } catch (err) {
      console.log(err);
    }
  }

  async registerStudents() {
    try {
      const res = await this.studentsService.registerStudents(this.auth.token, this.studentsReadFromFile);
      this.students = this.studentsReadFromFile;
    } catch (err) {
      alert('Error: ' + err.error.message);
    }
  }

  handleFileRead(file) {
    const fileBinary = file.target.result;
    const wb = xlsx.read(fileBinary, { type: 'binary'});
    this.studentsReadFromFile = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]).map((val) => {
      delete val['__rowNum__'];
      return val;
    });
  }

  handleFile(event) {
    this.fileReader.readAsBinaryString(event.target.files[0]);
  }
}
