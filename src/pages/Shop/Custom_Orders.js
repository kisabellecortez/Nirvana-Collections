import React, { useState } from 'react';

/* components */
import Sidebar from '../../components/Sidebar.js'
import TopNav from '../../components/TopNav.js'
import EndBanner from '../../components/EndBanner.js'
import { productsArray, imagesArray } from '../../data/productData.js'

/* MUI */
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Custom_Orders(){
    const [size, setSize] = useState('')

    const thing = "ring"

    return(
        <div>
            <Sidebar/>
            <TopNav/>

            <h1 className='header'>CUSTOM ORDERS</h1>

            <div className="custom-forms">
                { thing === "earring"? (
                    <div className="custom-form">
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <h1>Ring</h1>
                        </Box>
                    </div>
                ) : thing === "necklace" ? (
                    <div className="custom-form">
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <h1>Necklace</h1>
                        </Box>
                    </div>
                ) : thing === "bracelet" ? (
                    <div className="custom-form">
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            
                        </Box>
                    </div>
                ) : thing === "ring" ? (
                    <div className="custom-form">
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { minWidth: '120' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                            <Select
                                labelId="size"
                                id="size"
                                value={size}
                                label="Size"
                                onChange={(e)=>setSize(e.target.value)}
                                >
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={3.5}>3.5</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={4.5}>4.5</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={5.5}>5.5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={6.5}>6.5</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={7.5}>7.5</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={8.5}>8.5</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={9.5}>9.5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={10.5}>10.5</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={11.5}>11.5</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={12.5}>12.5</MenuItem>
                                <MenuItem value={13}>13</MenuItem>
                                <MenuItem value={13.5}>13.5</MenuItem>
                                <MenuItem value={14}>14</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                ) : thing === "anklet" ? (
                    <div className="custom-form">
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            
                        </Box>
                    </div>
                ) : (
                    <div className="custom-form">
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            
                        </Box>
                    </div>
                )}

            </div>

            <EndBanner/>
        </div>
    )
}