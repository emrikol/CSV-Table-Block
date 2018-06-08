<?php
/**
 * Plugin Name: CSV Table Block for Gutenberg
 * Plugin URI: https://github.com/emrikol/CSV-Table-Block
 * Description: A CSV block for the Gutenberg editor that renders HTML tables.
 * Version: 0.1
 * Author: Derrick Tennant
 * Author URI: https://emrikol.com/
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * GitHub Plugin URI: https://github.com/emrikol/CSV-Table-Block
 * Text Domain: csv-table-block
 *
 * @package WordPress
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require __DIR__ . '/class-csv-table-block.php';

add_action( 'init', array( 'CSV_Table_Block', 'register_block_types' ) );
add_action( 'enqueue_block_editor_assets', array( 'CSV_Table_Block', 'enqueue_block_editor_assets' ) );
