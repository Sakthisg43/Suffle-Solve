import React from 'react'
import './index.css'
import { GRID_SIZE, TILE_COUNT } from '../../Constants/constant'
import { getMatrixPosition, getVisualPosition } from '../../Constants/helpers'

const Tile = ({ tile, index, width, height,clickTile ,isStart}) => {

    console.log("tiles",tile)


    return (
        <>
            <div style={{
                opacity: tile === TILE_COUNT - 1 ? 0 : 1,
            }}
                className='tile'
                onClick={()=>isStart && clickTile(index)}
            >
                {tile + 1}
            </div>
        </>
    )
}

export default Tile