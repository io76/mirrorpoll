const root = '/projects/mirrorpoll'

const poll_time = 3000

const content = document.querySelector('#sample-content')

let NEEDS_UPDATE = false

const sample_controls = document.querySelectorAll('.control')
for( const control of sample_controls ){
	control.addEventListener('click', () => {
		NEEDS_UPDATE = true
		if( control.classList.contains( 'selected')){
			control.classList.remove('selected')
		}else{
			control.classList.add('selected')
		}
	})
}





let poll_read = setInterval( () => {

	fetch( root + '/state_get.php', {
		method: 'get',
	})
	.then( res => {
		res.json()
		.then( r => {
			if( r.success ){

				const state = JSON.parse( r.state )

				apply_server_state( state )

			}else{
				console.log( r )
			}
		})
		.catch( err => {
			console.log( err )
		})
	})

}, poll_time )









setTimeout(() => { // just to stagger them

	let poll_write = setInterval(()=>{

		if( NEEDS_UPDATE ){
			fetch( root + '/state_set.php', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					state: JSON.stringify( bundle_state() ),
				})
			})
			.then( res => {
				res.json()
				.then( r => {
					if( r.success ){
						if( content ){
							// you still need this after res.json() because state is stored as text.
							// so the first parse() just does the response, not the state
							const state = JSON.parse( r.state )
							content.innerText = ( JSON.stringify( state, false, 4 ) )
						}
					}else{
						console.log( r )
					}
				}).catch( err => { console.log( err ) })
			}).catch( err => { console.log( err )})
		}

		NEEDS_UPDATE = false
	
	}, poll_time )
	
}, poll_time / 2 ) 


const bundle_state = () => {

	let bundle = {
		controls: [] // <--- must have (!!) server looks for 'state' in the bundle
	}
	const controls = document.querySelectorAll('.control')
	for( const control of controls ){
		bundle.controls.push( control.classList.contains('selected') )
	}
	return bundle

}


// the main function
const apply_server_state = state => { 
	
	content.innerText = ( JSON.stringify( state, false, 4 ) )

}