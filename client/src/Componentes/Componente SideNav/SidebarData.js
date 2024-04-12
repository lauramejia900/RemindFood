import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';


export const SidebarData = [
  {
    title: 'Página principal',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Agregar nuevo producto',
    path: '/nuevo',
    icon: <AiIcons.AiFillPlusCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Próximos a vencerse',
    path: '/vencer',
    icon: <FaIcons.FaClock />,
    cName: 'nav-text'
  },
  {
    title: 'Próximos a acabarse',
    path: '/acabarse',
    icon: <AiIcons.AiFillWarning />,
    cName: 'nav-text'
  },
  {
    title: 'Lista de mercado',
    path: '/mercado',
    icon: <FaIcons.FaClipboardList    />,
    cName: 'nav-text'
  },
];