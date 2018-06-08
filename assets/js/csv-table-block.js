/**
 * Primary JS file for the CSV Table Block.
 *
 * @link    https://github.com/emrikol/CSV-Table-Block
 * @author  Derrick Tennant.
 * @package WordPress
 */

'use strict';

var __ = wp.i18n.__;
var el = wp.element.createElement;

wp.blocks.registerBlockType(
	'csvblock/table', {

		title: 'CSV Table',

		description: [
			__( 'Convert CSV data to a table.' )
		],

		icon: el( 'svg', { 'xmlns': 'http://www.w3.org/2000/svg', 'class': 'dashicons', 'width': '100', 'height': '100', 'viewBox': '38 40 124 120' }, el( 'path', { 'd': 'M110 104v-6h10v-8h-10v-6h10v-8h-10v-8H66V48h88v104H66v-12h44v-28h10v-8h-10zm-52 36v20h104V40H58v28H38v72h20zm6.409-32.74c-.064 1.385-.438 2.609-1.121 3.671s-1.643 1.884-2.878 2.468-2.646.875-4.231.875c-2.616 0-4.676-.852-6.18-2.557s-2.256-4.111-2.256-7.219v-.984c0-1.951.339-3.657 1.019-5.12s1.657-2.593 2.933-3.391 2.752-1.196 4.43-1.196c2.416 0 4.357.636 5.824 1.907s2.301 3.024 2.502 5.257h-4.785c-.037-1.212-.342-2.083-.916-2.611s-1.449-.793-2.625-.793c-1.194 0-2.069.447-2.625 1.34s-.848 2.32-.875 4.279v1.408c0 2.123.267 3.641.8 4.553s1.452 1.367 2.755 1.367c1.103 0 1.946-.26 2.529-.779s.893-1.344.93-2.475h4.77zm12.537 1.449c0-.701-.249-1.248-.745-1.641s-1.37-.797-2.618-1.217-2.27-.824-3.063-1.217c-2.58-1.268-3.869-3.008-3.869-5.223 0-1.103.321-2.076.964-2.919s1.552-1.5 2.728-1.969 2.498-.704 3.965-.704c1.431 0 2.714.255 3.849.766s2.017 1.237 2.646 2.181.943 2.021.943 3.233H76.96c0-.811-.249-1.44-.745-1.887s-1.169-.67-2.017-.67c-.857 0-1.534.189-2.03.567s-.745.859-.745 1.442c0 .51.273.973.82 1.388.547.415 1.508.843 2.885 1.285s2.506.919 3.391 1.429c2.151 1.24 3.227 2.949 3.227 5.127 0 1.74-.656 3.107-1.969 4.102s-3.113 1.49-5.4 1.49c-1.613 0-3.074-.289-4.382-.868s-2.292-1.372-2.953-2.379-.991-2.167-.991-3.479h4.813c0 1.066.276 1.853.827 2.358s1.447.759 2.687.759c.793 0 1.419-.171 1.88-.513s.688-.822.688-1.441zm14.985-.123l3.965-14.492h5.359L94.556 114h-5.25l-6.645-19.906h5.318l3.952 14.492zM126 76h16v8h-16v-8zm0 14h16v8h-16v-8zm0 14h16v8h-16v-8z', 'fill': '#000', 'fill-rule': 'evenodd' }, '' ) ),

		category: 'formatting',

		attributes: {
			content: { 
				type: 'string'
			},
			hasHeader: {
				type: 'boolean',
				default: false
			},
			hasDownload: {
				type: 'boolean',
				default: false
			}
		},

		supports: {
			html: false
		},

		edit: function( props ) {
			var attributes    = props.attributes,
				setAttributes = props.setAttributes,
				className     = props.className,
				isSelected    = props.isSelected;

			if ( attributes.hasHeader ) {
				var activeClass = ' is-active';
			}
			if ( attributes.hasDownload ) {
				var activeDownloadClass = ' is-active';
			}
			var csvblock_editor = [
			el( wp.editor.BlockControls, { 'key': 'custom-controls' },
				el(
					wp.components.Toolbar,
					null,
					el(
						wp.components.Tooltip,
						{ text: __( 'Toggle Header' ) },
						el(
							wp.components.Button, {
								className: 'components-icon-button components-toolbar__control' + activeClass,
								'is-active': attributes.hasHeader,
								onClick: function onClick() {
									props.setAttributes( { hasHeader: ! attributes.hasHeader } );
								}
							},
							el( 'svg', { 'viewBox': '0 0 181.8 181.8', 'width': 20 }, el( 'path', { 'd': 'M0 181.8h181.8V0H0v181.8zM163.6 18.2v29.5H18.2V18.2h145.4zM18.2 163.6V65.9h145.4v97.7H18.2z' }, '' ) )
						)
					),
					el(
						wp.components.Tooltip,
						{ text: __( 'Toggle Download Availability' ) },
						el(
							wp.components.Button, {
								className: 'components-icon-button components-toolbar__control' + activeDownloadClass,
								'is-active': attributes.hasDownload,
								onClick: function onClick() {
									props.setAttributes( { hasDownload: ! attributes.hasDownload } );
								}
							},
							el( 'svg', { 'xmlns': 'http://www.w3.org/2000/svg', 'viewBox': '0 0 12 16', 'width': 20, 'height': 20 }, el( 'path', { 'fill': 'none', 'd': 'M-4-2h20v20H-4z' } ), el( 'path', { 'd': 'M10 2v6h2V0H0v8h2V2h8zM8 4v6h3l-5 6-5-6h3V4h4z' } ) )
						)
					)
				)
			),
			el(
				wp.editor.BlockControls,
				{ key: 'controls' },
				el(
					'div',
					{ className: 'components-toolbar' },
					el(
						'button',
						{ className: 'components-tab-button is-active' },
						el(
							'span',
							null,
							'CSV Table'
						)
					)
				)
			), el( wp.editor.PlainText, {
				className: className,
				value: attributes.content,
				onChange: function onChange(content) {
					return setAttributes( { content: content } );
				},
				'aria-label': __( 'CSV Table' )
			} ) ];

			if ( isSelected ) {
				return csvblock_editor;
			} else {
				if ( typeof wpcom.actionbar != 'undefined' ) {
					// Gutenberg on WordPress.com is still kind-of broken.
					return csvblock_editor;
				} else {
					return [
						el( wp.components.ServerSideRender, {
							block: 'csvblock/table',
							attributes: props.attributes
						} )
					];
				}
			}
		},

		save: function( props ) {
			return null;
		}
	}
);
