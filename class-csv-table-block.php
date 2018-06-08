<?php
/**
 * Name: CSV Table Block for Gutenberg
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

/**
 * Main Class for the CSV Table Block
 */
class CSV_Table_Block {

	/**
	 * Registers the csv-table-block Block Type.
	 *
	 * @access public
	 * @return void
	 */
	public static function register_block_types() {
		register_block_type(
			'csvblock/table', array(
				'render_callback' => array( 'CSV_Table_Block', 'render_table' ),
				'attributes'      => array(
					'content'     => array(
						'type' => 'string',
					),
					'hasHeader'   => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'hasDownload' => array(
						'type'    => 'boolean',
						'default' => false,
					),
				),
			)
		);
	}

	/**
	 * Enqueues Block JS and CSS assets.
	 *
	 * @access public
	 * @return void
	 */
	public static function enqueue_block_editor_assets() {
		wp_enqueue_script(
			'csv-table-block',
			plugins_url( 'assets/js/csv-table-block.js', __FILE__ ),
			array( 'wp-blocks', 'wp-element' )
		);
		wp_enqueue_style(
			'csv-table-block',
			plugins_url( 'assets/css/csv-table-block.css', __FILE__ ),
			array()
		);
	}

	/**
	 * Renders the CSV into an HTML table.
	 *
	 * @param string $attributes Block attributes.
	 * @access public
	 * @return string
	 */
	public static function render_table( $attributes ) {
		$cell_sep   = ',';
		$line_sep   = "\n";
		$has_header = isset( $attributes['hasHeader'] ) ? $attributes['hasHeader'] : false;

		$data    = $attributes['content'];
		$output  = '<table class="wp-block-csvblock-table">';
		$lines   = explode( $line_sep, $data );
		$output .= '<tbody>';

		if ( true === $has_header ) {
			$output .= '<thead>';
			$output .= '<tr>';
			$cells   = str_getcsv( $lines[0], $cell_sep );

			foreach ( $cells as $cell ) {
				$output .= '<th>' . esc_html( $cell ) . '</th>';
			}
			$output .= '</tr>';
			$output .= '</thead>';

			// Remove the header for further processing.
			unset( $lines[0] );
		}

		$output .= '<tbody>';

		foreach ( $lines as $line ) {
			$output .= '<tr>';
			$cells   = str_getcsv( $line, $cell_sep );

			foreach ( $cells as $cell ) {
				$output .= '<td>' . esc_html( $cell ) . '</td>';
			}
			$output .= '</tr>';
		}
		$output .= '</tbody>';
		$output .= '</table>';
		return $output;
	}

}
