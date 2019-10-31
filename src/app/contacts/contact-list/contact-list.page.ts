import { ContactService } from './../shared/contact.service';
import { Contact } from './../shared/contact';
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService, 
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadContacts();
  }

  async loadContacts() {
    this.contacts = await this.contactService.getAll();
  }

  async doSerchBarChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2) {
      this.contacts = await this.contactService.filter(value);
    }
  }

  doSerchClear() {
    this.loadContacts();
  }

  async delete(contact: Contact) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o contato: ${name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(contact);
          }
        }
      ]
    });

    alert.present();
  }

  private async executeDelete(contact: Contact) {
    try {
      // Removendo do banco de dados
      await this.contactService.delete(contact.id);

      // Removendo do array
      const index = this.contacts.indexOf(contact);
      this.contacts.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Contato excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {

      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o Contato.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }
}
