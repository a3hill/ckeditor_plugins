// Register the plugin within the editor.
CKEDITOR.plugins.add( 'callout', {
  // This plugin requires the Widgets System defined in the 'widget' plugin.
  requires: 'widget',

  // Register the icon used for the toolbar button. It must be the same
  // as the name of the widget.
  icons: 'callout',

  // The plugin initialization logic goes inside this method.
  init: function( editor ) {
    // Register the callout widget.
    editor.widgets.add( 'callout', {
      // Allow all HTML elements and classes that this widget requires.
      // Read more about the Advanced Content Filter here:
      // * https://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_advanced_content_filter
      // * https://docs.ckeditor.com/ckeditor4/docs/#!/guide/plugin_sdk_integration_with_acf
      allowedContent: 'div();',

      // Minimum HTML which is required by this widget to work.
      requiredContent: 'div(callout)',

      // Define two nested editable areas.
      editables: {
        content: {
          selector: '.callout',
          allowedContent: 'h3 p br ul ol li strong em; a[!href]',
        }
      },

      // Define the template of a new callout widget.
      // The template will be used when creating new instances of the Simple Box widget.
      template:
      '<div class="callout">' +
      '<p>Insert callout content here...</p>' +
      '</div>',

      button: 'Create a callout area',

      // Check the elements that need to be converted to widgets.
      //
      // Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
      // so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
      // during data processing which is done on DOM represented by JavaScript objects.
      upcast: function( element ) {
        // Return "true" (that element needs to converted to a Callout widget)
        // for all <div> elements with a "callout" class.
        return element.name == 'div' && element.hasClass( 'callout' );
      }
    } );
  }
} );