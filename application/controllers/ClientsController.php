<?php

class ClientsController extends Zend_Controller_Action
{

    public function init()
    {
        $config = new Zend_Config(require_once APPLICATION_PATH . '/configs/alegra_config.php');

        $this->user = $config->username;
        $this->token = $config->password;

        $this->view->titlePage = 'Contactos';
        $this->view->newButton = 'contacto';
        $this->view->newType = null;

        if ($this->hasParam('type')) {
            $type = $this->getParam('type');

            if ($type == 'client') {
                $this->view->titlePage = 'Clientes';
                $this->view->newButton = 'cliente';
                $this->view->newType = 'client';

            } else if ($type == 'provider') {
                $this->view->titlePage = 'Proveedores';
                $this->view->newButton = 'proveedor';
                $this->view->newType = 'provider';
            }
        }
    }

    public function indexAction()
    {
        //
    }

    public function detailsAction()
    {
        if (!$this->hasParam('id')) {
            $this->_helper->layout()->disableLayout();
            throw new Zend_Controller_Action_Exception('', 404);
        }

        $id = $this->getParam("id");
        $url = 'https://app.alegra.com/api/v1/contacts/' . $id;
        $client = new Zend_Http_Client($url);
        $client->setHeaders('WWW-Authenticate');
        $client->setAuth($this->user, $this->token, Zend_Http_Client::AUTH_BASIC);

        $response = $client->request('GET');
        $data = json_decode($response->getBody());

        if ($response->getStatus() !== 200) {
            throw new Zend_Controller_Action_Exception('', 404);
        }

        $this->view->titlePage = $data->name;
        $this->view->newButton = $data->name;
        $this->view->contact = $data;
    }

    public function addAction()
    {
        //
    }

    public function editAction()
    {
        //
    }
}
