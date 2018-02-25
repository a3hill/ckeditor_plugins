
// Note: This automatic widget to dialog window binding (the fact that every field is set up from the widget
// and is committed to the widget) is only possible when the dialog is opened by the Widgets System
// (i.e. the widgetDef.dialog property is set).
// When you are opening the dialog window by yourself, you need to take care of this by yourself too.

CKEDITOR.dialog.add( 'quote', function( editor ) {
  var lang = editor.lang.quote,
    configs = editor.config;


  return {
    // Basic properties of the dialog window: title, minimum size.
    title: 'Edit Quote',
    minWidth: 500,
    minHeight: 100,

    // Dialog window contents.
    contents: [
      {
        id: 'info',
        elements: [
          {
            // Create Quote textarea.
            id: 'quote',
            label: 'Quote',
            type: 'textarea',
            setup: function( widget ) {
              this.setValue( widget.data.quote );
            },
            // When committing (saving) this field, set its value to the widget data.
            commit: function( widget ) {
              widget.setData( 'quote', this.getValue() );
            },
            required: true,
            validate: CKEDITOR.dialog.validate.notEmpty( lang.emptyQuoteError ),
          },
          {
            // Create Attribution text field.
            id: 'attribution',
            label: 'Attribution',
            type: 'text',
            setup: function( widget ) {
              this.setValue( widget.data.attribution );
            },
            commit: function( widget ) {
              widget.setData( 'attribution', this.getValue() );
            },
            required: true,
            validate: CKEDITOR.dialog.validate.notEmpty( lang.emptyAttributionError ),
          }
        ]
      }
    ]
  };
});