/**
 * Insert Custom Stat
 */

// @TODO Clean up Comments

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'stat', {
  // This plugin requires the Widgets System defined in the 'widget' plugin.
  requires: 'widget',

  // Note: In order to be able to translate your widget you should use the
  // editor.lang.stat.* property to define labels and other content that may need to be translated
  // See lang/en.js for example
  lang: 'en',

  // Register the icon used for the toolbar button. It must be the same
  // as the name of the widget.
  icons: 'stat',

  // The plugin initialization logic goes inside this method.
  init: function( editor ) {
    // Register the editing dialog.
    CKEDITOR.dialog.add( 'stat', this.path + 'dialogs/stat.js' );

    registerWidget(editor);
  }
} );

// Encapsulates snippet widget registration code.
// @param {CKEDITOR.editor} editor
function registerWidget( editor ) {
  // @TODO Change line breaks to <br>
  var newLineRegex = /\r?\n/g,
    breakRegex = /<br\s*[\/]?>/gi;

  // Register the stat widget.
  editor.widgets.add( 'stat', {
    // Minimum HTML which is required by this widget to work.
    requiredContent: 'div(stat-wrapper)',

    // Allow all HTML elements, classes, and styles that this widget requires.
    // @TODO Read more about the Advanced Content Filter here:
    // * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
    // * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
    allowedContent:
    'div(!stat-wrapper,align-left,align-right,align-center);' +
    'div(!stat-content); div(!stat)',

    // @TODO Editable not updating dialog
    // Define two nested editable areas.
    /*editables: {
      stat: {
        // Define CSS selector used for finding the element inside widget element.
        selector: '.stat',
        // Define content allowed in this nested editable. Its content will be
        // filtered accordingly and the toolbar will be adjusted when this editable
        // is focused.
        allowedContent: 'br strong em'
      },
      content: {
        selector: '.stat-content',
        allowedContent: 'p br ul ol li strong em'
      }
    },*/

    // Define the template of a new Stat widget.
    // The template will be used when creating new instances of the Stat widget.
    template:
      '<div class="stat-wrapper">' +
      '<div class="stat"></div>' +
      '<div class="stat-content"></div>' +
      '</div>',

    parts: {
      // Define parts of template to target with CSS selector
      stat: 'div.stat',
      statContent: 'div.stat-content'
    },

    // Define the label for a widget toolbar button which will be automatically
    // created by the Widgets System. This button will insert a new widget instance
    // created from the template defined above, or will edit selected widget
    button: editor.lang.stat.button,

    // Set the widget dialog window name. This enables the automatic widget-dialog binding.
    // This dialog window will be opened when creating a new widget or editing an existing one.
    dialog: 'stat',

    // Check the elements that need to be converted to widgets.
    //
    // Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
    // so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
    // during data processing which is done on DOM represented by JavaScript objects.
    upcast: function( element ) {
      // Return "true" (that element needs to converted to a Stat widget)
      // for all <div> elements with a "stat" class.
      return element.name == 'div' && element.hasClass( 'stat-wrapper' );
    },

    // When a widget is being initialized, we need to read the data ("align" and "color")
    // from DOM and set it by using the widget.setData() method.
    // More code which needs to be executed when DOM is available may go here.
    init: function() {

      // Set stat field
      if ( stat = this.element.findOne('.stat').$.textContent )
        this.setData( 'stat', stat );

      // Set stat content field
      if ( statContent = this.element.findOne('.stat-content').$.textContent ) {
        this.setData( 'statContent', statContent );
      }

      // Set align & color field
      setDataFromClass(this, 'align');
      setDataFromClass(this, 'color');
    },

    // Listen on the widget#data event which is fired every time the widget data changes
    // and updates the widget's view.
    // Data may be changed by using the widget.setData() method, which we use in the
    // Stat dialog window.
    data: function() {

      // Target "parts" of template to insert data
      if ( this.data.stat )
        this.parts.stat.setHtml(this.data.stat);

      if ( this.data.statContent )
        // this.parts.statContent.setHtml(this.data.statContent.replace( newLineRegex, '<br>'));
        this.parts.statContent.setHtml(this.data.statContent);

      // Brutally remove all align and color classes and set a new one if widget data is set.
      updateClass(this, 'align');
      updateClass(this, 'color');
    }
  } );
}

// Match class based on start of string
function matchClass (classList, subString) {
  classList = classList.split(" ");

  for (var i = 0; i < classList.length; i++) {
    if (classList[i].startsWith(subString)) {
      return classList[i].replace(subString, '');
    }
  }
}

// Set widget data from class value
function setDataFromClass (el, selector) {
  var setClass = matchClass(el.element.$.className, selector + '-');
  if ( el.element.hasClass( selector + '-' + setClass ) )
    el.setData( selector, setClass );
}

// Remove existing class and update to new class
function updateClass (el, selector) {
  var removeClass = matchClass(el.element.$.className, selector + '-');
  el.element.removeClass( selector + '-' + removeClass );

  if ( el.data[selector] )
    el.element.addClass( selector + '-' + el.data[selector] );
}
