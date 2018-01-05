<?php

namespace Drupal\cke_ckeditor_plugins\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginConfigurableInterface;
use Drupal\ckeditor\CKEditorPluginContextualInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "stat" plugin.
 *
 * NOTE: The plugin ID ('id' key) corresponds to the CKEditor plugin name.
 * It is the first argument of the CKEDITOR.plugins.add() function in the
 * plugin.js file.
 *
 * @CKEditorPlugin(
 *   id = "stat",
 *   label = @Translation("Stat")
 * )
 */
class Stat extends CKEditorPluginBase {

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
      'Stat' => [
        'label' => t('Stat'),
        'image' => 'modules/custom/cke_ckeditor_plugins/js/plugins/stat/icons/stat.png',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   * Returns the Drupal root-relative file path to the plugin JavaScript file.
   *
   * Note: this does not use a Drupal library because this uses CKEditor's API,
   * see http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.resourceManager.html#addExternal.
   */
  public function getFile() {
    // Make sure that the path to the plugin.js matches the file structure of
    // the CKEditor plugin you are implementing.
    return drupal_get_path('module', 'cke_ckeditor_plugins') . '/js/plugins/stat/plugin.js';
  }

  /**
   * {@inheritdoc}
   * Indicates if this plugin is part of the optimized CKEditor build.
   *
   * Plugins marked as internal are implicitly loaded as part of CKEditor.
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   * Returns a list of plugins this plugin requires.
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   * Returns a list of libraries this plugin requires.
   *
   * These libraries will be attached to the text_format element on which the
   * editor is being loaded.
   */
  public function getLibraries(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   * Returns the additions to CKEDITOR.config for a specific CKEditor instance.
   *
   * The editor's settings can be retrieved via $editor->getSettings(), but be
   * aware that it may not yet contain plugin-specific settings, because the
   * user may not yet have configured the form.
   * If there are plugin-specific settings (verify with isset()), they can be
   * found at
   * @code
   * $settings = $editor->getSettings();
   * $plugin_specific_settings = $settings['plugins'][$plugin_id];
   * @endcode
   */
  public function getConfig(Editor $editor) {
    $settings = $editor->getSettings();

    // Get color options
    $terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadByProperties(['vid' => 'color_scheme']);
    $colorScheme = [];

    foreach ($terms as $term) {
      $name = $term->get('name');
      $value = str_replace(' ', '-',strtolower($name->getString()));

      $colorScheme[] = [
        "name" => $name->getString(),
        "value" => $value,
      ];
    }

    // Add config
    return [
      'colorScheme' => $colorScheme,
    ];
  }
}
