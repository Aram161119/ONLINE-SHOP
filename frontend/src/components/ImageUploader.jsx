import { useState, useCallback } from 'react';
import { Box, Button } from '@mui/material';

export const ImageUploader = ({
	value,
	onChange,
	width = 150,
	height = 150,
	label = 'Change Image',
}) => {
	const [preview, setPreview] = useState(null);

	const handleFile = useCallback(
		(file) => {
			if (!file) return;

			setPreview(URL.createObjectURL(file));
			onChange(file);
		},
		[onChange],
	);

	const handleInput = (e) => {
		handleFile(e.target.files?.[0]);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		handleFile(e.dataTransfer.files?.[0]);
	};

	return (
		<Box
			onClick={() => document.getElementById('uploader-input').click()}
			onDrop={handleDrop}
			onDragOver={(e) => e.preventDefault()}
			sx={{
				width,
				height,
				borderRadius: 2,
				overflow: 'hidden',
				cursor: 'pointer',
				position: 'relative',
				userSelect: 'none',
				'&:hover .overlay': { opacity: 1 },
				'& .overlay': !preview && !value && { opacity: 1 },
			}}
		>
			<img
				src={preview || value}
				alt="preview"
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					display: 'block',
				}}
			/>

			<Box
				className="overlay"
				sx={{
					position: 'absolute',
					inset: 0,
					background: 'rgba(0,0,0,0.45)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: '#fff',
					fontWeight: 600,
					fontSize: 15,
					borderRadius: 2,
					opacity: 0,
					transition: 'opacity 0.25s ease',
				}}
			>
				{label}
			</Box>

			<input
				type="file"
				accept="image/*"
				id="uploader-input"
				style={{ display: 'none' }}
				onChange={handleInput}
			/>
		</Box>
	);
};
