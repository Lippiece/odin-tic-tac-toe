/*
* Arrays
*/
const board       = [[],[],[]],
	sections        = document.querySelectorAll("section"),
	controlsSection = sections[0],
	selectCrosses   = controlsSection.children[0],
	selectNoughts   = controlsSection.children[1],
	resetButton     = controlsSection.children[2],
	boardSection    = sections[1],
	popup           = document.querySelector(".popup");
/*
* Check variables
*/
let playsCrosses = true,
	started;

/*
* Control event listeners
*/
selectCrosses.addEventListener("click", () => {
	if (!started) {
		playsCrosses = true;
		selectCrosses.classList.add("selected");
		selectNoughts.classList.remove("selected");
	}
	started = true;
});
selectNoughts.addEventListener("click", () => {
	if(!started) {
		playsCrosses = false;
		selectNoughts.classList.add("selected");
		selectCrosses.classList.remove("selected");
	}
	started = true;
});
/*
* Initializer
*/
/*
* Main block
*/
{
	/*
	* Support functions
	*/
	function checkWinner() {
		const combos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (const combo of combos) {
			const [a, b, c] = combo;

			// Check if all three are the same
			if (boardSection.children[a].innerHTML === boardSection.children[b].innerHTML &&
				boardSection.children[b].innerHTML === boardSection.children[c].innerHTML &&
				boardSection.children[a].innerHTML !== "") {
				// Add class to winning elements
				boardSection.children[a].classList.add("winner");
				boardSection.children[b].classList.add("winner");
				boardSection.children[c].classList.add("winner");
				popup.classList.add("show");
				popup.innerHTML = `${boardSection.children[a].innerHTML} wins!`;

				return true;
			}
		}
	}
	/*
	* -er functions

 	*/
	/*
	* Fills the board with empty content
	*/
	const filler = state => {
			return {
				fillContent: () => {
					const convertedPosition = state.position[0] * 3 + state.position[1];

					boardSection.children[convertedPosition].innerHTML = state.content;

					return state;
				}
			};
		},
		/*
		* Adds event listener to a field
		*/
		/*

		* Field object constructor
		*/
		field = (properties) => {
			 const state = {
				position: properties.position,
				toFill  : properties.toFill,
				content : properties.content,
				element : properties.element
			};

			return Object.assign(
				{},
				filler(state),
				resetter(state),
				// tester(state),
				eventer(state));
		};

}