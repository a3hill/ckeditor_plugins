<?php

namespace Drupal\cke_ckeditor_plugins\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "descriptionlist" plugin.
 *
 * NOTE: The plugin ID ('id' key) corresponds to the CKEditor plugin name.
 * It is the first argument of the CKEDITOR.plugins.add() function in the
 * plugin.js file.
 *
 * @CKEditorPlugin(
 *   id = "descriptionlist",
 *   label = @Translation("Description list")
 * )
 */
class DescriptionList extends CKEditorPluginBase {


  /**
   * {@inheritdoc}
   *
   * NOTE: The keys of the returned array corresponds to the CKEditor button
   * names. They are the first argument of the editor.ui.addButton() or
   * editor.ui.addRichCombo() functions in the plugin.js file.
   */
  public function getButtons() {
    // Make sure that the path to the image matches the file structure of
    // the CKEditor plugin you are implementing.
    return [
      'DescriptionList' => [
        'label' => t('Description List'),
        'image' => 'modules/custom/cke_ckeditor_plugins/js/plugins/descriptionlist/icons/descriptionlist.png',
      ],
      'DescriptionTerm' => [
        'label' => t('Description Term'),
        'image' => 'modules/custom/cke_ckeditor_plugins/js/plugins/descriptionlist/icons/descriptionterm.png',
      ],
      'descriptionValue' => [
        'label' => t('Description Value'),
        'image' => 'modules/custom/cke_ckeditor_plugins/js/plugins/descriptionlist/icons/descriptionvalue.png',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    // Make sure that the path to the plugin.js matches the file structure of
    // the CKEditor plugin you are implementing.
    return drupal_get_path('module', 'cke_ckeditor_plugins') . '/js/plugins/descriptionlist/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

}
