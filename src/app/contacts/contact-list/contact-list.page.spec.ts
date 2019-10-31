import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListPage } from './contact-list.page';

describe('ContactListPage', () => {
  let component: ContactListPage;
  let fixture: ComponentFixture<ContactListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
