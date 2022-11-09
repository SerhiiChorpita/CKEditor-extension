import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IList, IStyle, ITable, ITL } from '../shared/models/style.inteface';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  mainStyle: IStyle = {
    textSize: '',
    fontFamily: 'Time New Roman',
    color: '',
    bgColor: '',
    bold: false,
    italic: false,
    underline: false
  }

  addCheck: ITL = {
    table: true,
    list: false
  }

  checkEdit = false;
  checkStyle = false;
  checkSave = false;
  checkTLeditor = false;

  typeOfMarkOl = false;
  typeOfMarkUl = false;
  markOl = '';
  markUl = '';

  textColor = '';
  bgColor = '';
  brdColor = '';

  previewCheck = false;
  previewWindow = true;

  addStatus = false;

  blocked = false;
  wrongPass = false;

  focused1 = false;
  focused2 = false;
  focused3 = false;
  focused4 = false;
  focused5 = false;
  focused6 = false;

  tableData: ITable = {
    row: 0,
    cell: 1,
    width: 10,
    height: 10,
    borderWidth: 1,
    borderType: 'solid',
    borderColor: 'black'
  }

  listData: IList = {
    lisItems: 0,
    typeList: '',
    typeMark: ''
  }

  mainContent = '<h1>Lorem</h1> Ipsum dolor sit amet consectetur adipisicing elit. Eveniet rerum iusto obcaecati adipisci. Odio blanditiis adipisci voluptate harum ullam debitis doloribus necessitatibus nisi illo commodi laboriosam nobis minus nam voluptatibus cupiditate reprehenderit pariatur non, aut ex consectetur labore architecto dignissimos natus. Quam modi ab dicta esse minus cumque architecto fugit est quis? Quod blanditiis eligendi iste aperiam, voluptatibus beatae?Odio praesentium a maiores esse odit necessitatibus deleniti rerum voluptatum ea sunt iure excepturi enim sed nesciunt quidem, blanditiis asperiores veniam ullam, quaerat maxime similique? Eum nostrum dicta, eligendi quam at pariatur odit numquam provident amet adipisci mollitia dolore, repellendus reiciendis ullam eos magnam cumque ad, tempore quasi nihil cum! Magnam exercitationem illo enim vel, velit quibusdam aspernatur distinctio accusantium labore facilis beatae doloremque, rem maiores! Esse delectus porro temporibus quasi distinctio consequuntur iure hic voluptatum amet corporis cumque, alias officia illo. Explicabo suscipit nihil at deserunt cum facere commodi odio repudiandae ea esse nisi perspiciatis labore mollitia, autem minus iste perferendis ipsam laboriosam fugiat saepe sint a magnam sit dignissimos? Temporibus a, doloribus, alias quis voluptatem id enim vitae natus eveniet, itaque impedit esse repellat. Laboriosam, harum, ullam tempora alias molestiae obcaecati tenetur necessitatibus est, error minima quam cupiditate eum!'
  previewContent = '';

  constructor(
  ) { }

  ngOnInit(): void {
    this.updateFirstBlock();
  }

  checkListValue(value: string) {
    this.listData.typeList = value;
    if (value === 'ol') {
      this.listData.typeMark = 'upper-roman'
    }
    if (value === 'ul') {
      this.listData.typeMark = 'circle'
    }
  }

  changeEdit(): void {
    this.checkEdit = !this.checkEdit;
  }
  changeEditTL(): void {
    if (this.addStatus) {
      this.checkTLeditor = !this.checkTLeditor;
    }
  }

  updateFirstBlock(): void {
    setTimeout(() => {
      if (!this.addStatus) {
        let myContainer = <HTMLElement>document.querySelector('.first-block__text-area');
        myContainer.innerHTML = this.mainContent;
      }
    }, 1)
  };

  changeAddStatus(): void {
    this.addStatus = !this.addStatus;
  }

  checkTl(table: boolean): void {
    if (table == true) {
      this.addCheck.table = true;
      this.addCheck.list = false;
    } else {
      this.addCheck.list = true;
      this.addCheck.table = false;
    }
  }

  previewElemCheck(elem: HTMLElement) {
    let myPreviewContent = <HTMLElement>document.querySelector('.pre-container__content');
    if (this.previewCheck) {
      myPreviewContent.innerHTML = '';
      this.previewContent = '';
      this.previewContent += elem.outerHTML;
      myPreviewContent.innerHTML = this.previewContent;
    } else {
      myPreviewContent.innerHTML = '';
      this.previewContent = '';
      this.changeAddStatus();
      setTimeout(() => {
        this.mainContent += elem.outerHTML;
      }, 1)
    }
    return this.previewContent
  }

  createTable(table: NgForm) {
    const tbl = document.createElement('table');
    tbl.style.border = `${table.value.borderWidth}px ${table.value.borderType} ${table.value.borderColor}`;
    for (let i = 0; i < table.value.row; i++) {
      const tr = tbl.insertRow();
      for (let j = 0; j < table.value.cell; j++) {
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(`${i}/${j}`));
        td.style.width = `${table.value.width}px`;
        td.style.height = `${table.value.height}px`;
        td.style.border = `${table.value.borderWidth}px ${this.tableData.borderType} ${table.value.borderColor}`;
      }
    }
    this.previewElemCheck(tbl);
  }

  createList(list: NgForm, createElem: string) {
    const oul = document.createElement(`${createElem}`);
    oul.style.listStyle = `${this.listData.typeMark}`;
    for (let i = 0; i < list.value.lisItems; i++) {
      const li = document.createElement("li")
      li.appendChild(document.createTextNode('Text'));
      oul.appendChild(li);
    }
    this.previewElemCheck(oul);
  }

  addTag(tag: string) {
    this.mainContent += tag;
  }

  changeBlockStatus() {
    console.log(this.blocked);

    this.blocked = !this.blocked;
  }

  checkBlock(data: NgForm) {
    console.log(`data.value  `, data.value.invalid);

    if (!this.blocked) {
      return
    }
    if (data.value.password === 'qwerty123') {
      this.changeBlockStatus();
      this.wrongPass = false;
      return
    } else {
      this.wrongPass = true;
      setTimeout(() => {
        this.wrongPass = false;
      }, 2500);
    }
  }

  changePreviewWindow() {
    this.previewWindow = !this.previewWindow;
  }

}
