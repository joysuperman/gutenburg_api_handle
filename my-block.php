<?php
/**
 * Plugin Name:       My Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       my-block
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function my_block_my_block_block_init() {

    // For Multiple blocks
    $blocks = array(
        'first-block',
    );
    foreach ($blocks as $block) {
        register_block_type( __DIR__ . "/build/{$block}" );
    }

	// User API Enqueue In Admin
    add_action('admin_enqueue_scripts', 'my_block_enqueue_scripts');
}
add_action('init', 'my_block_my_block_block_init');

// User API Enqueue Function
function my_block_enqueue_scripts() {
    $handle = "my-block-first-block-editor-scripts";

    $data = get_transient('my-block');

    if (!$data) {
        $response = wp_remote_get('https://jsonplaceholder.typicode.com/users');
		$data = wp_remote_retrieve_body($response);
		set_transient('my-block', $data, 7 * DAY_IN_SECONDS);
    }

    wp_enqueue_script(
        $handle,
        plugin_dir_url(__FILE__) . "build/first-block/index.js",
        array('wp-blocks', 'wp-element'),
        null,
        true
    );

    wp_localize_script($handle, 'myFirstBlockData', $data);
}
