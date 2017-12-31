
// Note: This automatic widget to dialog window binding (the fact that every field is set up from the widget
// and is committed to the widget) is only possible when the dialog is opened by the Widgets System
// (i.e. the widgetDef.dialog property is set).
// When you are opening the dialog window by yourself, you need to take care of this by yourself too.

CKEDITOR.dialog.add( 'stat', function( editor ) {
  var lang = editor.lang.stat,
    configs = editor.config,
    colorScheme = [],
    animationOptions = [];

  // Get color scheme from config
  configs.colorScheme.forEach(function (item) {
    colorScheme.push([item.name, item.value])
  });

  // Get animation options from config
  configs.animationOptions.forEach(function (item) {
    animationOptions.push([item.name, item.value])
  });

  return {
    // Basic properties of the dialog window: title, minimum size.
    title: 'Edit Stat',
    minWidth: 500,
    minHeight: 100,

    // Dialog window contents.
    contents: [
      {
        id: 'info',
        elements: [
          {
            // Create Stat text field.
            id: 'stat',
            label: 'Stat',
            type: 'text',
            setup: function( widget ) {
              this.setValue( widget.data.stat );
            },
            // When committing (saving) this field, set its value to the widget data.
            commit: function( widget ) {
              widget.setData( 'stat', this.getValue() );
            },
            required: true,
            validate: CKEDITOR.dialog.validate.notEmpty( lang.emptyStatError ),
          },
          {
            // Create Stat Description textarea.
            id: 'statContent',
            label: 'Stat Description',
            type: 'textarea',
            setup: function( widget ) {
              this.setValue( widget.data.statContent );
            },
            commit: function( widget ) {
              widget.setData( 'statContent', this.getValue() );
            },
            required: true,
            validate: CKEDITOR.dialog.validate.notEmpty( lang.emptyStatContentError ),
          },
          {
            // Create Align list.
            id: 'align',
            type: 'select',
            label: 'Align',
            items: [
              [ editor.lang.common.notSet, '' ],
              [ editor.lang.common.alignLeft, 'left' ],
              [ editor.lang.common.alignRight, 'right' ],
              [ editor.lang.common.alignCenter, 'center' ]
            ],
            // When setting up this field, set its value to the "align" value from widget data.
            // Note: Align values used in the widget need to be the same as those defined in the "items" array above.
            setup: function( widget ) {
              this.setValue( widget.data.align );
            },
            commit: function( widget ) {
              widget.setData( 'align', this.getValue() );
            }
          },
          {
            // Create Color list.
            id: 'color',
            type: 'select',
            label: 'Color',
            items: colorScheme,
            default: colorScheme[0][1],
            setup: function( widget ) {
              this.setValue( widget.data.color );
            },
            commit: function( widget ) {
              widget.setData( 'color', this.getValue() );
            }
          },
          {
            // Create Color list.
            id: 'animation',
            type: 'radio',
            label: 'Animation',
            items: animationOptions,
            default: animationOptions[0][1],
            setup: function( widget ) {
              this.setValue( widget.data.animation );
            },
            commit: function( widget ) {
              widget.setData( 'animation', this.getValue() );
            }
          }
        ]
      }
    ]
  };
} );