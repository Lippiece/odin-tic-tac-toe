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