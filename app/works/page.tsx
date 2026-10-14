'use client';
import { assetPath } from '../../lib/asset-path';
import {useEffect} from 'react';
export default function Works(){useEffect(()=>{location.replace(assetPath('/#works'));},[]);return <a href={assetPath('/#works')}>返回作品</a>;}
