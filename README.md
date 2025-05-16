# Wharmora

# 📄 Génération de PDF en Angular avec html2canvas + jsPDF

Ce projet Angular permet de récupérer les informations de l'utilisateur et de générer un livre.  
L'application va ensuite capturer un contenu HTML (incluant texte et images) et le convertir en PDF plein écran, en orientation paysage, sans marges blanches.

---

## 📚 Sommaire

- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [📦 Installation](#-installation)
- [▶️ Development server](#development-server)
- [🧱 Code scaffolding](#code-scaffolding)
- [🚀 Utilisation](#-utilisation)
- [🖼️ Recommandations pour les images](#️-recommandations-pour-les-images)
- [✅ Résultat attendu](#-résultat-attendu)
- [📄 Licence](#-licence)
- [🏗️ Build](#build)
- [🧪 Running unit tests](#running-unit-tests)
- [🧪 Running end-to-end tests](#running-end-to-end-tests)
- [❓ Further help](#further-help)

---

## 🛠️ Technologies utilisées

- [Angular](https://angular.io/)
- [html2canvas](https://www.npmjs.com/package/html2canvas)
- [jsPDF](https://www.npmjs.com/package/jspdf)

---

## 📦 Installation

1. Cloner le projet :

```bash
git clone https://github.com/mon-utilisateur/mon-projet-angular-pdf.git
cd mon-projet-angular-pdf
```

> Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

2. Installer les dépendances :

```bash
npm install
```

3. Ajouter les bibliothèques nécessaires :

```bash
npm install html2canvas jspdf
```

---

## Development server

Lancez ng serve pour démarrer un serveur de développement.
Accédez à l'application via `http://localhost:4200/`.
L'application se rechargera automatiquement dès que vous modifiez un fichier source.

---

## Code scaffolding

Utilisez `ng generate component nom-du-composant` pour générer un nouveau composant.
Vous pouvez aussi utiliser `ng generate directive|pipe|service|class|guard|interface|enum|module`.

---

## 🚀 Utilisation

### 1. Ajouter le HTML à capturer

```html
<div #pdfContent class="contenu-pdf">
  <!-- Exemple : texte et images -->
  <p>Ceci est un test de génération PDF avec image</p>
  <img src="assets/illustration.png" alt="illustration" />
</div>
```

### 2. Ajouter le code TypeScript correspondant

```ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html'
})
export class ExportPdfComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  generatePDF(): void {
    html2canvas(this.pdfContent.nativeElement, {
      useCORS: true,
      allowTaint: false,
      scale: 2
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Remplit la page sans marges (attention à la déformation possible)
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('document.pdf');
    });
  }
}
```

---

## 🖼️ Recommandations pour les images

- Préfère les images locales (dans `assets/`) pour éviter les problèmes CORS.
- Ajoute `useCORS: true` à `html2canvas` pour permettre le rendu des images distantes avec en-tête CORS correct.
- Si les images ne s'affichent pas dans le PDF, vérifie les chemins ou la configuration CORS du serveur.

---

## ✅ Résultat attendu

- Le contenu HTML est converti en PDF
- Le rendu est en orientation **paysage**
- Aucune bordure blanche n'est présente dans le fichier PDF
- Les images et le texte sont intégrés comme visibles dans le navigateur

---

## 📄 Licence

Ce projet est open-source et disponible sous licence **MIT**.

---

## Build

Lancez `ng build` pour compiler le projet.
Les fichiers générés seront dans le dossier `dist/`.

---

## Running unit tests

Lancez ng test pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io).

---

## Running end-to-end tests

Lancez `ng e2e` pour exécuter les tests end-to-end avec la plateforme de votre choix.
Pour utiliser cette commande, vous devez d’abord ajouter un package qui implémente ces tests.

---

## Further help

Pour plus d’aide sur Angular CLI, utilisez `ng help` ou consultez la page [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).