import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormPage } from './contact-form.page';

describe('ContactFormPage', () => {
  let component: ContactFormPage;
  let fixture: ComponentFixture<ContactFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
