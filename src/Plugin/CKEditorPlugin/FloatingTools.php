<?php

namespace Drupal\cke_ckeditor_plugins\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginConfigurableInterface;
use Drupal\ckeditor\CKEditorPluginContextualInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "floating-tools" plugin.
 *
 * NOTE: The plugin ID ('id' key) corresponds to the CKEditor plugin name.
 * It is the first argument of the CKEDITOR.plugins.add() function in the
 * plugin.js file.
 *
 * @CKEditorPlugin(
 *   id = "floating-tools",
 *   label = @Translation("Floating tools")
 * )
 */
class FloatingTools extends CKEditorPluginBase implements CKEditorPluginConfigurableInterface, CKEditorPluginContextualInterface {


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

    // No buttons required for floating-tools
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    // Make sure that the path to the plugin.js matches the file structure of
    // the CKEditor plugin you are implementing.
    return drupal_get_path('module', 'cke_ckeditor_plugins') . '/js/plugins/floating-tools/plugin.js';
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
    $settings = $editor->getSettings();

    // Set default values
    $buttons = 'Bold, Italic, -, BulletedList, NumberedList, -, Linkit';

    // Replace buttons if values are present from settings
    if (!empty($settings['plugins']['floating-tools']['toolbar_buttons'])) {
      $buttons = ($settings['plugins']['floating-tools']['toolbar_buttons']);
    }

    $buttons = explode(', ', $buttons);

    // Return config, array keys will correspond with CKEDITOR.config items
    // i.e. we are returning CKEDITOR.config.floatingtools and CKEDITOR.config.floatingtools_Basic
    // See http://stracker-phil.github.io/Floating-Tools/ for config options for floating-tools
    return [
      'floatingtools' => 'Basic',
      'floatingtools_Basic' => [$buttons],
    ];
  }

  /**
   * @inheritDoc
   */
  public function settingsForm(array $form, FormStateInterface $form_state, Editor $editor) {
    $settings = $editor->getSettings();

    // Add enabled checkbox
    $form['enable'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable the Floating Toolbar'),
      '#default_value' => !empty($settings['plugins']['floating-tools']['enable']) ? $settings['plugins']['floating-tools']['enable'] : FALSE,
    ];

    // Add text field for button config
    $form['toolbar_buttons'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Buttons'),
      '#description' => $this->t('Enter the buttons to appear on the floating toolbar, use comma to separated.'),
      '#default_value' => !empty($settings['plugins']['floating-tools']['toolbar_buttons']) ? $settings['plugins']['floating-tools']['toolbar_buttons'] : 'Bold, Italic, -, BulletedList, NumberedList, -, Linkit',
    ];

    return $form;
  }

  /**
   * @inheritDoc
   */
  public function isEnabled(Editor $editor) {
    // Get editor settings and enable accordingly
    $settings = $editor->getSettings();
    return isset($settings['plugins']['floating-tools']) ? $settings['plugins']['floating-tools']['enable'] : FALSE;
  }
}
