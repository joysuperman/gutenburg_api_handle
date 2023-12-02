/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save() {
	const users = window.myFirstBlockData || [];
	return (
		<div { ...useBlockProps.save() }>
			<h2>User Data</h2>
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
