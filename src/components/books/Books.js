import React from "react";
import styles from "./Books.module.scss";

const Books = ({books}) => {
	return (
		<div className={styles.books}>
			<h1>List of Books Available</h1>
			<ul>
				{books.map((book, index) => {
					const authors = book.authors.join(" , ");
					const endDate = new Date(book.released).toDateString();

					return (
						<li key={index}>
							<div className={styles.title}>
								<p>Publisher :</p>
								<p>Name :</p>
								<p>ISBN :</p>
								<p>Authors :</p>
								<p>End Date :</p>
							</div>
							<div>
								<p>{book.publisher}</p>
								<p>{book.name}</p>
								<p>{book.isbn}</p>
								<p>{authors}</p>
								<p>{endDate}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Books;
