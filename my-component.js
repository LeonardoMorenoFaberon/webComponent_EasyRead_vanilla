// my-component.js
class MyComponent extends HTMLElement {
  //---------------------------------------------------------------------------------------------
    constructor() {
      super();
  
      // Create a shadow DOM
      this.attachShadow({ mode: 'open' });
      // this.miComponenteP
      this.connectedCallbackEjecutado =  false;
      this.titulo   = '';
      this.mensaje  = '';
      // Define a property for the input parameter  
      console.log('constructor')

    }
    //---------------------------------------------------------------------------------------------

    getTemplate(templateTxtDelFetch){
      const templatehtmlizado     = document.createElement('template');
      templatehtmlizado.innerHTML = templateTxtDelFetch;
      console.log(templatehtmlizado);
      console.log('getTemplate')
      return templatehtmlizado;
    }
  
    //---------------------------------------------------------------------------------------------  
    connectedCallback(){
      fetch('template.html')
      .then(response => response.text())
      .then(html => {
        // Store the template HTML
        this._template = html;

        // Initialize the component with the input parameter
        // this._render();

        this.shadowRoot.appendChild( this.getTemplate(this._template).content )
        
        this.miComponenteP = this.shadowRoot.querySelector('p');
        this.miComponenteH1 = this.shadowRoot.querySelector('h1');
        this.connectedCallbackEjecutado =  true;
      })
      .then( ()=> {
                   this.mensaje != ''? this.miComponenteP.innerText  = this.mensaje : ''; 
                   this.titulo  != ''? this.miComponenteH1.innerText = this.titulo  : '';
                   } )
      
      // .then(templateObtenido=>{this.shadowRoot.appendChild(templateObtenido.content)})
      .catch(error => console.error('Error fetching template:', error));

      // this._render();
      
      console.log('connectedCallback')

    }

    

    //---------------------------------------------------------------------------------------------
    static get observedAttributes(){
      //obsrvador de forma constante.
      // console.log(`${this.identificador} ha cambiado`);
      
      console.log('observedAttributes')
      this.arrProps = [ "mensaje", "titulo" , "url"];
      return this.arrProps;
  }

  //---------------------------------------------------------------------------------------------
  attributeChangedCallback(actualVal , oldVal , newVal){
      // console.log(`val actual `+ actualVal +` valor viejo `+ oldVal + ` valor nuevo `+ newVal);
      
      console.log('attributeChangedCallback')

      if(actualVal === "mensaje"  ){
         this.mensaje = newVal;

          this.miComponenteP = this.shadowRoot.querySelector('p');
          // this.miComponenteP.innerText = this.mensaje
          if(this.connectedCallbackEjecutado){ this.miComponenteP.innerText = this.mensaje };

      } 
      if(actualVal === "titulo"  ){
          this.titulo   =  newVal
          
          // this.miComponenteH1 = this.shadowRoot.querySelector('h1');
          if(this.connectedCallbackEjecutado){ this.miComponenteH1.innerText = this.titulo; }

      } 
      if(actualVal === "url"  ){
          this.url   =  newVal
          // console.log(`url ha cambiado: ` + this.url);
           
          // this.urlPhp = 'http://localhost/webCheckList/php/traerEmpresas.php';
          this.urlPhp = this.url ;
          fetch(this.urlPhp )
              .then(res   => res.json() )
              .then( res  => { this.manejadorDeRespustas(res) });
      } 
  }

  

      //---------------------------------------------------------------------------------------------
      // Define a getter and setter for the input parameter
    //   get message() {
    //     return this._message;
    //   }
    
    // //---------------------------------------------------------------------------------------------
    //   set message(value) {
    //     this._message = value;
    //     // Update the component when the input parameter changes
    //     this._render();
    //   }
    
    //---------------------------------------------------------------------------------------------
      // Render the component with the current state
      _render() {
        // Check if the template is available
        if (this._template) {
          // Access the shadow DOM content and update it with the template content
          this.shadowRoot.innerHTML = this._template.replace('{{message}}', this._message);
     
        }
      }
    


  }
  
  
  // Define the custom element
  customElements.define('my-component', MyComponent);
  
  
  
 
