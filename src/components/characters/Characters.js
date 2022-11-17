import React from "react";
import styles from "./Characters.module.scss";

const Characters = ({characters}) => {
	return (
		<div className={styles.characters}>
			<h1>List of Characters Currently</h1>
			<ul>
				{characters.map((character, index) => {
					return (
						<li key={index}>
							<div className={styles.title}>
								<p>Character's Name:</p>
								<p>Character's culture :</p>
							</div>
							<div>
								<p>{character.name}</p>
								<p>{character.culture}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Characters;
