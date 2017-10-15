<?php

class IndexController extends Zend_Controller_Action
{
    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        return $this->_helper->redirector->gotoSimple('index', 'clients');
    }
}
