/*
 * Arrays
 */
const board = [[], [], []],
	sections        = document.querySelectorAll( "section" ),
	controlsSection = sections[0],
	selectCrosses   = controlsSection.children[0],
	selectNoughts   = controlsSection.children[1],
	resetButton     = controlsSection.children[2],
	testButton      = controlsSection.children[3],
	boardSection    = sections[1],
	popup = document.querySelector( ".popup" ),
	combos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
/*
 * Check variables
 */
let playsCrosses = true,
	started;

/*
 * Control event listeners
 */
selectCrosses.addEventListener( "click", () =>
{
	if ( !started )
	{
		playsCrosses = true;
		selectCrosses.classList.add( "selected" );
		selectNoughts.classList.remove( "selected" );
	}
	started = true;
} );
selectNoughts.addEventListener( "click", () =>
{
	if( !started )
	{
		playsCrosses = false;
		selectNoughts.classList.add( "selected" );
		selectCrosses.classList.remove( "selected" );
	}
	started = true;
} );
/*
 * Initializer
 */
function initialize( field )
{
	for ( let posI = 0; posI < 3; posI++ )
	{
		for ( let posY = 0; posY < 3; posY++ )
		{
			const fieldContainer = document.createElement( "div" );

			boardSection.append( fieldContainer );
			board[posI][posY] = field(
				{
					position: [posI, posY],
					content : "",
					element : fieldContainer,
				}
			);
			board[posI][posY].fillContent();
			board[posI][posY].addEventListeners();
		}
	}
}
/*
 * Main block
 */
{
	/*
	 * Main listeners
	 */
	resetButton.addEventListener( "click", () =>
	{
		// Reset every field
		board.map( ( axis ) => axis.map( ( field ) => field.resetContent() ) );
		// For ( const fieldContainer of boardSection.children )  fieldContainer.classList.remove( "cross", "nought", "winner", "availableX" ) ;
	} );
	testButton.addEventListener( "click", () =>
	{
		const selection = opponentSelectRandomField();

		selection.makeMove( selection );
		checkWinner();
	} );
	/*
	 * Auxillary functions
	 */
	function makeUnclickable()
	{
		for ( const field of boardSection.children )
		{ field.classList.add( "unclickable" ) }
	}
	/**
	 * It adds the endgame classes and removes the unneded ones, then
	 * shows the popup with the winning player's symbol
	 * @param first - the first index of the winning combination
	 * @param second - the second element in the winning row
	 * @param third - the third cell in the winning row
	 */
	function finalizeWin( first, second, third )
	{
		boardSection.children[first].classList.add( "winner" );
		boardSection.children[second].classList.add( "winner" );
		boardSection.children[third].classList.add( "winner" );
		boardSection.classList.add( "win" );
		selectCrosses.classList.remove( "selected" );
		selectNoughts.classList.remove( "selected" );
		resetButton.classList.add( "highlight" );
		popup.classList.add( "shown" );
		popup.innerHTML = `${ boardSection.children[first].innerHTML } wins!`;
		makeUnclickable();
	}
	/**
	 * If the first, second, and third elements of a combo are the same and not empty, then add needed classes and show the toast.
	 * @returns true if there is a winner.
	 */
	function checkWinner()
	{
		for ( const combo of combos )
		{
			const [first, second, third] = combo;

			// Check if all three are the same
			if ( boardSection.children[first].innerHTML === boardSection.children[second].innerHTML
    && boardSection.children[second].innerHTML === boardSection.children[third].innerHTML
    && boardSection.children[first].innerHTML !== "" )
			{
				finalizeWin( first, second, third );

				return true;
			}
		}
	}
	/**
	 * It fills the field with either an "X" or an "O" depending on the value of the playsCrosses variable
	 * @param state - The state of the field.
	 * @param selection - The selection object created when the user clicked on the field.
	 */
	/**
	 * It selects a random empty field on the board and returns it.
	 * @returns the selection variable.
	 */
	function opponentSelectRandomField()
	{
		let posI = Math.floor( Math.random() * 3 ),
			posY = Math.floor( Math.random() * 3 ),
			selection = board[posI][posY],
			convertedPosition = ( posI * 3 ) + posY;

		do
		{
			posI              = Math.floor( Math.random() * 3 );
			posY              = Math.floor( Math.random() * 3 );
			selection         = board[posI][posY];
			convertedPosition = ( posI * 3 ) + posY;
		} while ( boardSection.children[convertedPosition].innerHTML !== "" );

		return selection;
	}
	/**
	 * It adds the appropriate class to the clicked element and sets its content.
	 * @param state - The state of the cell.
	 */
	function addClasses( state )
	{
		if ( playsCrosses )
		{
			state.content = "X";
			state.element.classList.add( "cross", "unclickable" );
		}

		else
		{
			state.content = "O";
			state.element.classList.add( "nought", "unclickable" );
		}
		state.element.classList.remove( "availableX", "availableY" );
	}
	function showAvailableCombos()
	{
		// Cleanup before
		const suggestions = [];

		for ( const fieldContainer of boardSection.children )
		{ fieldContainer.classList.remove( "availableX", "availableY" ) }
		for ( const combo of combos )
		{
			const [first, second, third] = combo,
				content1 = boardSection.children[first].innerHTML,
				content2 = boardSection.children[second].innerHTML,
				content3 = boardSection.children[third].innerHTML;

			if ( !playsCrosses
			&& ( content1 === "" || content1 === "X" )
			&& ( content2 === "" || content2 === "X" )
			&& ( content3 === "" || content3 === "X" ) )
			{
				/*
				 * BoardSection.children[first].classList.add( "availableX" );
				 * boardSection.children[second].classList.add( "availableX" );
				 * boardSection.children[third].classList.add( "availableX" );
				 */
				suggestions.push(	boardSection.children[first],
					boardSection.children[second],
					boardSection.children[third] );
			}
			else
			if ( playsCrosses
			&& ( content1 === "" || content1 === "O" )
			&& ( content2 === "" || content2 === "O" )
			&& ( content3 === "" || content3 === "O" ) )
			{
				boardSection.children[first].classList.add( "availableY" );
				boardSection.children[second].classList.add( "availableY" );
				boardSection.children[third].classList.add( "availableY" );
				suggestions.push(	boardSection.children[first],
					boardSection.children[second],
					boardSection.children[third] );

			}
			function getRandomIntInclusive( min, max )
			{
				min = Math.ceil( min );
				max = Math.floor( max );

				return Math.floor( Math.random() * ( ( max - min + 1 ) + min ) );
			}

			return suggestions[getRandomIntInclusive( 0, suggestions.length-1 )];
		}
	}
	/*
	 * -er functions
	 *
	 */
	/*
	 * Fills the board with empty content
	 */
	const filler = state =>
		{
			return {
				fillContent: () =>
				{
					state.element.innerHTML = state.content;
					if( started )
					{
						addClasses( state );
						showAvailableCombos();
					}
				},
			};
		},
		/*
		 * Adds an event listener to a field
		 */
		eventer = state =>
		{
			return {
				addEventListeners: () =>
				{
					state.element.addEventListener( "click", () =>
					{
						started = true;
						addClasses( state );
						state.element.innerHTML = state.content;
						playsCrosses            = !playsCrosses;
						// For ( const fieldContainer of boardSection.children )  fieldContainer.classList.remove( "availableX" ) ;
						if( !checkWinner() )
						{
							const selection = showAvailableCombos();

							selection.makeMove( selection );
							checkWinner();
						}
					} );
				},
			};
		},
		resetter = state =>
		{
			return {
				resetContent: () =>
				{
					state.content           = "";
					state.element.innerHTML = "";
					state.element.classList.remove( "cross", "nought", "winner", "unclickable"/* , "availableX", "availableY" */ );
					boardSection.classList.remove( "win" );
					resetButton.classList.remove( "highlight" );
					popup.classList.remove( "shown" );
					started      = false;
					playsCrosses = true;

					return state;
				},
			};
		},
		opponent = state =>
		{
			return {
				makeMove: ( selection ) =>
				{
					if ( playsCrosses )
					{
						state.content = "X";
						selection.fillContent();
						playsCrosses = !playsCrosses;
						checkWinner();

						return;
					}
					state.content = "O";
					selection.fillContent();
					playsCrosses = !playsCrosses;
					checkWinner();
				},
			};
		},
		 /*
		  * Field object constructor
		  */
		field = ( properties ) =>
		{
			const state = {
				position: properties.position,
				toFill  : properties.toFill,
				content : properties.content,
				element : properties.element,
			};

			return {
				...filler( state ),
				...resetter( state ),
				...eventer( state ),
				...opponent( state ),
			};
		};

	initialize( field );
}