import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoComponentsModule, PoFieldModule, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { DadosPessoaisModel, Historico } from './shared/models';
import { ButtonDocumentModel, DocumentResponse, DTAVisionOCRComponent } from 'dta-vision-ocr';

@Component({
  selector: 'app-root',
  imports: [FormsModule, PoFieldModule, PoComponentsModule, ReactiveFormsModule, DTAVisionOCRComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loading: boolean = false;
  screenLock: boolean = false;
  // Variáveis para o modal de DTA Vision
  habilitaModalDtaVision = false;


  // Variáveis para o formulário de dados pessoais
  historicoEscolar?: Historico;
  dadosPessoais?: DadosPessoaisModel;

  //Colunas para tabela de histórico escolar
  columns: Array<PoTableColumn> = [
    { property: 'disciplina', label: 'Disciplina' },
    { property: 'nota', label: 'Nota' },
    { property: 'cargaHoraria', label: 'Carga Horária' },
    { property: 'credito', label: 'Crédito' }
  ];

  // Variáveis para o DTA Vision
  idTotvsVision = "";
  idProjeto = ""
  user = "";
  contingency: string = '';
  
  constructor( public poNotification: PoNotificationService, private readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      // Dados Pessoais
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      cpf: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      validade: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],

      //Aluno info
      nomeAluno: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      matricula: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    });
  }

  @ViewChild('webAppModal') webAppModal?: DTAVisionOCRComponent;

  abrirModalQrCode() {
    this.habilitaModalDtaVision = true;
    this.webAppModal?.openWebAppModal();
  }

  buttonList: ButtonDocumentModel[] = [
    {
      "idButton": "01",
      "nameButton": "Dados Pessoais",
      "imageReturn": true,
      "userFields": [
        {
          "fieldName": "name",
          "fieldDescription": "Nome do usuario",
          "fieldType": "string"
        },
        {
          "fieldName": "cpf",
          "fieldDescription": "Cpf do usuario",
          "fieldType": "string"
        },
        {
          "fieldName": "validade",
          "fieldDescription": "Data de validade da carteira",
          "fieldType": "string"
        },
        {
          "fieldName": "dataNascimento",
          "fieldType": "string"
        }
      ]
    },
    {
      "idButton": "02",
      "nameButton": "Historico Escolar",
      "imageReturn": false,
      "userFields": [
        {
          "fieldName": "alunoInfo",
          "fieldType": "object",
          "subFields": [
            {
              "fieldName": "nomeAluno",
              "fieldDescription": "Nome do aluno",
              "fieldType": "string"
            },
            {
              "fieldName": "matricula",
              "fieldDescription": "Matricula do aluno",
              "fieldType": "string"
            }
          ]
        },
        {
          "fieldName": "disciplinas",
          "fieldType": "array",
           "subFields": [
            {
              "fieldName": "disciplina",
              "fieldDescription": "Nome da discipline",
              "fieldType": "string"
            },
            {
              "fieldName": "nota",
              "fieldDescription": "Nota do aluno",
              "fieldType": "string"
            },
            {
              "fieldName": "cargaHoraria",
              "fieldDescription": "Carga horario do aluno",
              "fieldType": "string"
            },
            {
              "fieldName": "credito",
              "fieldDescription": "Credito do aluno",
              "fieldType": "string"
            }
          ]
        }
      ]
    }
  ];

  receberInformacao(informacao: { menssagem: DocumentResponse; uniqueKey: number; }) {
    console.log('Informação recebida:', informacao);
    let parsedResponse;
    try {
      // Corrigindo a desserialização do ocrResponse
      parsedResponse = JSON.parse(informacao.menssagem.ocrResponse);
    } catch (error) {
      console.error(`Erro de deserializar ${informacao.menssagem.idButton}:`, error);
      return;
    }

    switch (informacao.menssagem.idButton) {
      case "1":  // Dados Pessoaiss
      case "01":  // Dados Pessoais
       this.dadosPessoais = parsedResponse as DadosPessoaisModel;

        this.form.patchValue({
          name: this.dadosPessoais.name,
          cpf: this.dadosPessoais.cpf,
          validade: this.dadosPessoais.validade,
          dataNascimento: this.dadosPessoais.dataNascimento
        });
      break;

      // Outros casos seguem inalterados
      case "2":  // Histórico Escolar
      case "02":  // Histórico Escolar
        this.historicoEscolar = parsedResponse as Historico;
        this.form.patchValue({
          nomeAluno: this.historicoEscolar.alunoInfo.nomeAluno,
          matricula: this.historicoEscolar.alunoInfo.matricula,          
        });
        this.loading = false;
        this.screenLock = false;
        break;
      default:
        console.warn(`Não existe o ID do botão: ${informacao.menssagem.idButton}`);
        break;
    }
  }
}
