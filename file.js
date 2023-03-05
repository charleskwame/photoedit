// using canvas approach
// getting file selected
const fileInput = document.getElementById("selectedFile");
// creating a new img file
const img = new Image();
// creating inital saturation level
let saturation = 0;
// creating intital contrast level
let contrast = 0;
// adding event listener to file input
fileInput.addEventListener("change", function () {
	// accessing the file index
	const file = fileInput.files[0];
	// creating  a new reader object
	const reader = new FileReader();
	// adding a .onload to the reader function to set the image src to the target of the result from the reader object
	reader.onload = function (event) {
		img.src = event.target.result;
	};
	// reading the selected file
	reader.readAsDataURL(file);
	// putting the image on a canvas when it has been loaded
	img.onload = function () {
		// getting the canvas element in the html
		const canvas = document.getElementById("canvas");
		// getting the context
		const context = canvas.getContext("2d");
		// setting the width
		canvas.width = img.width;
		// setting the height
		canvas.height = img.height;
		// displaying the image
		context.drawImage(img, 0, 0);

		// creating saturating function
		// Add a slider for adjusting saturation
		const sliderSaturation = document.getElementById("sliderSaturation");
		const saturationOutput = document.getElementById("saturationOutput");
		// set the initial value of the slider
		sliderSaturation.value = saturation;
		// adding event listener to the slider
		sliderSaturation.addEventListener("input", function () {
			// update the saturation level
			saturation = sliderSaturation.value;
			saturationOutput.innerText = sliderSaturation.value;
			// apply the filter
			saturateImage(canvas, context, img, saturation);
		});

		// creating contrasting function
		// add a slider for adjusting contrast
		const sliderContrast = document.getElementById("sliderContrast");
		const contrastOutput = document.getElementById("contrastOutput");
		// setting the inital value of contrast
		sliderContrast.value = contrast;
		// adding an event listener to the slider
		sliderContrast.addEventListener("input", function () {
			// update the contrast level
			contrast = sliderContrast.value;
			contrastOutput.innerText = sliderContrast.value;
			// applying the filter
			increaseContrast(canvas, context, img, contrast);
		});
	};
});

// function to apply saturate filter image
function saturateImage(canvas, context, img, saturation) {
	// Add saturation to the image
	context.filter = `saturate(${saturation})`;
	context.drawImage(img, 0, 0);
}

// function to apply contrast filter
function increaseContrast(canvas, context, img, contrast) {
	// add contrast to the image
	context.filter = `contrast(${contrast})`;
	context.drawImage(img, 0, 0);
}

// download button
// Create a link element and set its href and download attributes
const link = document.getElementById("downloadLink");
link.addEventListener("click", function () {
	// Get a reference to the canvas element
	const canvas = document.getElementById("canvas");
	// Get the base64 encoded string representation of the image
	const dataURL = canvas.toDataURL();
	// Get the name of the file from the input element
	const fileName = fileInput.files[0].name;
	// setting link href to the dataURL
	link.href = dataURL;
	// setting the link download to the fileName
	link.download = fileName;
});
