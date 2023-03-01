<script type="module">
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10.0.0/+esm'
</script>

# Arquitectura de software
>*Conjunto de definiciones que proporcionan un marco de referencia necesario para guiar la construcción de un software, permitiendo a los programadores, analistas, testers y todo el conjunto de desarrolladores del software compartir una misma línea de trabajo y cubrir todos los objetivos y restricciones de la aplicación. Es considerada el nivel más alto en el diseño de la arquitectura de un sistema puesto que establecen la estructura, funcionamiento e interacción entre las partes del software.*

El objetivo principal de una arquitectura es asegurar la separación de responsabilidades mediante capas y definiendo reglas de dependencias entre ellas, que permitar desacoplar el dominio de la applicación de la implementación.

## Arquitecturas
1.- Cliente/Servidor
2.- N-Capas 
3.- MVC
4.- Clean
5.- Hexagonal
6.- Onion (Cebolla)

```mermaid
sequenceDiagram
    autonumber
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

```mermaid
erDiagram

    CUSTOMER }|..|{ DELIVERY-ADDRESS : has
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o{ INVOICE : "liable for"
    DELIVERY-ADDRESS ||--o{ ORDER : receives
    INVOICE ||--|{ ORDER : covers
    ORDER ||--|{ ORDER-ITEM : includes
    PRODUCT-CATEGORY ||--|{ PRODUCT : contains
    PRODUCT ||--o{ ORDER-ITEM : "ordered in"  
```
