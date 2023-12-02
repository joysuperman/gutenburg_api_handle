/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const users = window.myFirstBlockData || [];

	return (
		<div { ...useBlockProps }>
			<h2>{ __( 'User Data', 'my-block' ) }</h2>
			<table className="my-blocks_user_table">
				<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Address</th>
					<th>Phone</th>
				</tr>
				</thead>
				<tbody>
				{ users.map((user) => (
					<tr key={ user.id }>
						<td>{ user.id }</td>
						<td>{ user.name }</td>
						<td>{ user.email }</td>
						<td>{`${user.address.suite}, ${user.address.city}, ${user.address.zipcode}, (${user.address.geo.lat}, ${user.address.geo.lng})`}</td>
						<td>{ user.phone }</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}
