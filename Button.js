class Button extends HTMLElement {
    static get observedAttributes() {
      return ["variant", "size"];
    }
  
    constructor() {
      super();
    //  this.attachShadow({ mode: "open" });
  
      // this.shadowRoot.adoptedStyleSheets.push(...Array.from(document.styleSheets)
      // .map(x => {
      //   const sheet = new CSSStyleSheet();
      //   const css = Array.from(x.cssRules).map(rule => rule.cssText).join(' ');
      //   sheet.replaceSync(css);
      //   return sheet;
      // }));

      // Default attributes
      this.variant = "default";
      this.size = "default";
  

      // Read and clear the current text content
      const initialText = this.textContent.trim();
      this.textContent = ""; // Clear the text content to prevent duplication

      // Create a button element
    this.button = document.createElement("button");
    this.button.textContent = initialText; // Set the text content to the button

    this.updateButtonStyles();
    //this.shadowRoot.appendChild(this.button);
    this.appendChild(this.button);
    }
  
    connectedCallback() {
      this.updateButtonStyles();
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this[name] = newValue;
        this.updateButtonStyles();
      }
    }
  
    updateButtonStyles() {
      const styles = {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      };
  
      const sizes = {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      };
  
      const variantClass = styles[this.variant] || styles.default;
      const sizeClass = sizes[this.size] || sizes.default;
  
      this.button.className = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variantClass} ${sizeClass}`;
    }
  }
  
  customElements.define("swc-button", Button);
  