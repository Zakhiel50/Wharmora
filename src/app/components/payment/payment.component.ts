import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PdfStorageService } from '../../pdf-storage.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  totalAmount = 25.00;
paymentConfirmed = false;

  constructor(private fb: FormBuilder, private pdfStorage: PdfStorageService) {}

  ngOnInit(): void {
  this.paymentForm = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    expiry: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')]],
    cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
  });
  }

onSubmit(): void {
  if (this.paymentForm.valid) {
    this.paymentConfirmed = true;
  } else {
    this.paymentForm.markAllAsTouched(); 
  }
}
downloadPdf() {
  const blob = this.pdfStorage.getPdf();
  if (blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document-landscape.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    alert("Le PDF n'est pas disponible.");
  }
}

}
