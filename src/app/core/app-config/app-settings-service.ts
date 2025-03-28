import { Injectable } from '@angular/core';
import { EndPoints } from './end-points';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsService {

    /**
     * @description: Login de usuario
     */
    public auth = {
        url: {
            base: EndPoints.uriBase('Auth/Login'),
            baseOut: EndPoints.uriBase('Auth/logout'),
            baseCheck: EndPoints.uriBase('Auth/checkSession'),
            baseRefresh: EndPoints.uriBase('Auth/refresh'),
            baseReset: EndPoints.uriBase('Auth/resetPassword'),
            baseChange: EndPoints.uriBase('Auth/ChangePassword'),
        },
    };

    public departamentos = {
        url: {
            base: EndPoints.uriBase('Departamentos')
        }
    }

    public municipios = {
        url: {
            base: EndPoints.uriBase('Municipios/Departamento'),
            baseMunicipio: EndPoints.uriBase('Municipios')
        }
    }

    public empresasMaestras = {
        url: {
            base: EndPoints.uriBase('EmpresaMaestras')
        }
    }

    public empresasClientes = {
        url: {
            base: EndPoints.uriBase('SubEmpresas'),
            baseTrabajador: EndPoints.uriBase('SubEmpresas/Clientes'),
        }
    }

    public tiposEmpresas = {
        url: {
            base: EndPoints.uriBase('TipoEmpresas')
        }
    }

    public tiposDocumentos = {
        url: {
            base: EndPoints.uriBase('TipoDocumentos')
        }
    }

    public generos = {
        url: {
            base: EndPoints.uriBase('Generos')
        }
    }

    public capitalInversion = {
        url: {
            base: EndPoints.uriBase('CapitalInversiones')
        }
    }

    public solicitudesCreditos = {
        url: {
            base: EndPoints.uriBase('Solicitudes')
        }
    }

    public tasasIntereses = {
        url: {
            base: EndPoints.uriBase('TasaIntereses')
        }
    }

    public tiposPagos = {
        url: {
            base: EndPoints.uriBase('TipoPagos')
        }
    }

    public empleados = {
        url: {
            base: EndPoints.uriBase('Trabajadores'),
            baseValidate: EndPoints.uriBase('Trabajadores/ValidaInfo'),
            basePerfil: EndPoints.uriBase('Trabajadores/perfil'),
        }
    }

    public cargos = {
        url: {
            base: EndPoints.uriBase('Cargos')
        }
    }

    public creditos = {
        url: {
            base: EndPoints.uriBase('Creditos')
        }
    }

    public estadoCreditos = {
        url: {
            base: EndPoints.uriBase('EstadoCreditos/Creditos'),
            baseCobros: EndPoints.uriBase('EstadoCreditos/CobroTrabajadores')
        }
    }

    public detalleConsumos = {
        url: {
            base: EndPoints.uriBase('DetalleConsumos'),
            baseTrabajador: EndPoints.uriBase('DetalleConsumos/Trabajador'),
            desembolsoBase: EndPoints.uriBase('DetalleConsumos/DetalleConsumoDesembolso')
        }
    }

    public cobroTrabajadores = {
        url: {
            base: EndPoints.uriBase('CobroTrabajadores'),
            baseTabla: EndPoints.uriBase('CobroTrabajadores/Tabla'),
            baseCard: EndPoints.uriBase('CobroTrabajadores/CardTrabajador'),
        }
    }

    public subcripciones = {
        url: {
            base: EndPoints.uriBase('Suscripciones')
        }
    }

    public riesgos = {
        url: {
            base: EndPoints.uriBase('NivelesRiesgos')
        }
    }

    public bancos = {
        url: {
            base: EndPoints.uriBase('Bancos')
        }
    }

    public cuentasBancarias = {
        url: {
            base: EndPoints.uriBase('CuentasBancarias')
        }
    }

    public tipoConsumos = {
        url: {
            base: EndPoints.uriBase('TipoConsumos')
        }
    }

    public tipoCuentas = {
        url: {
            base: EndPoints.uriBase('TipoCuentas')
        }
    }

   public tipoSolicitudes = {
        url: {
            base: EndPoints.uriBase('TipoSolicitudes')
        }
    }

    /*Trabajadores*/
    public authTrabajador = {
        url: {
            base: EndPoints.uriBase('Usuarios/RegistroTrabajador'),
        }
    }



}
