import React, {useState, useEffect} from "react";
import {Books, Characters, Loader} from "..";
import styles from "./Inventory.module.scss";
import axios from "axios";

const Inventory = () => {
	const [input, setInput] = useState("");
	const [books, setBooks] = useState([]);
	const [characters, setCharacters] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	let filteredBooks = [];
	let filteredCharacters = [];

	const filterBooks = books.filter(
		(book) =>
			book.publisher.toLowerCase().includes(input.toLowerCase()) ||
			book.name.toLowerCase().includes(input.toLowerCase()) ||
			book.isbn.toLowerCase().includes(input.toLowerCase()) ||
			book.authors[0].toLowerCase().includes(input.toLowerCase()) ||
			book.released.toLowerCase().includes(input.toLowerCase()),
	);

	filteredBooks = filterBooks;

	const filterCharacter = characters.filter(
		(character) =>
			character.name.toLowerCase().includes(input.toLowerCase()) ||
			character.culture.toLowerCase().includes(input.toLowerCase()),
	);

	filteredCharacters = filterCharacter;

	useEffect(() => {
		const getData = async () => {
			await axios
				.all([
					axios.get(
						`${process.env.REACT_APP_API_URL}/api/books?page=${page}&pageSize=3`,
					),
					axios.get(
						`${process.env.REACT_APP_API_URL}/api/characters?page=${page}&pageSize=4`,
					),
				])

				.then(
					axios.spread((booksList, charactersList) => {
						setBooks((previous) => [...previous, ...booksList.data]);
						setCharacters((previous) => [...previous, ...charactersList.data]);
						setLoading(false);
					}),
				)

				.catch((error) => {
					console.log(error.message);
				});
		};

		getData();
	}, [page]);

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop + 1 >=
			document.documentElement.scrollHeight
		) {
			setLoading(true);
			setPage((previous) => previous + 1);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className={styles.section}>
			<div className={styles.search}>
				<input
					type='text'
					placeholder='Search for a book here...'
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
			</div>
			<div className={styles["section-width"]}>
				<Books books={filteredBooks} />
				<Characters characters={filteredCharacters} />
			</div>
			{loading && <Loader />}
		</section>
	);
};

export default Inventory;
