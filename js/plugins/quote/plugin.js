/**
* Insert Custom Quote
*/

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'quote', {
  // This plugin requires the Widgets System defined in the 'widget' plugin.
  requires: 'widget',

  // Note: In order to be able to translate your widget you should use the
  // editor.lang.quote.* property to define labels and other content that may need to be translated
  // See lang/en.js for example
  lang: 'en',

  // Register the icon used for the toolbar button. It must be the same
  // as the name of the widget.
  icons: 'quote',

  // The plugin initialization logic goes inside this method.
  init: function( editor ) {
    // Register the editing dialog.
    CKEDITOR.dialog.add( 'quote', this.path + 'dialogs/quote.js' );

    registerQuoteWidget(editor);
  }
} );

// Encapsulates snippet widget registration code.
// @param {CKEDITOR.editor} editor
function registerQuoteWidget( editor ) {

  // Register the quote widget.
  editor.widgets.add( 'quote', {
    // Minimum HTML which is required by this widget to work.
    requiredContent: 'div(quote-wrapper)',

    // Allow all HTML elements, classes, and styles that this widget requires.
    // * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
    // * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
    allowedContent: 'div();',

    // Define the template of a new Stat widget.
    // The template will be used when creating new instances of the Stat widget.
    template:
      '<div class="quote-wrapper">' +
      '<div class="quote"></div>' +
      '<div class="attribution"></div>' +
      '</div>',

    parts: {
      // Define parts of template to target with CSS selector
      quote: 'div.quote',
      attribution: 'div.attribution'
    },


    // Define the label for a widget toolbar button which will be automatically
    // created by the Widgets System. This button will insert a new widget instance
    // created from the template defined above, or will edit selected widget
    button: editor.lang.quote.button,

    // Set the widget dialog window name. This enables the automatic widget-dialog binding.
    // This dialog window will be opened when creating a new widget or editing an existing one.
    dialog: 'quote',

    // Check the elements that need to be converted to widgets.
    //
    // Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
    // so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
    // during data processing which is done on DOM represented by JavaScript objects.
    upcast: function( element ) {
      // Return "true" (that element needs to converted to a Quote widget)
      // for all <div> elements with a "quote" class.
      return element.name == 'div' && element.hasClass( 'quote-wrapper' );
    },

    // When a widget is being initialized, we need to read the data ("align" and "color")
    // from DOM and set it by using the widget.setData() method.
    // More code which needs to be executed when DOM is available may go here.
    init: function() {

      // Set quote field
      if ( quote = this.element.findOne('.quote').$.textContent )
        this.setData( 'quote', quote );

      // Set quote content field
      if ( attribution = this.element.findOne('.attribution').$.textContent ) {
        this.setData( 'attribution', attribution );
      }
    },

    // Listen on the widget#data event which is fired every time the widget data changes
    // and updates the widget's view.
    // Data may be changed by using the widget.setData() method, which we use in the
    // Stat dialog window.
    data: function() {

      // Target "parts" of template to insert data
      if ( this.data.quote )
        this.parts.quote.setHtml(this.data.quote);

      if ( this.data.attribution )
        // this.parts.quoteContent.setHtml(this.data.quoteContent.replace( newLineRegex, '<br>'));
        this.parts.attribution.setHtml(this.data.attribution);
    }
  } );
}

