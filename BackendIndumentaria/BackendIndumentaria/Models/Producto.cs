using System;
using System.Collections.Generic;

namespace BackendIndumentaria.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public double? Precio { get; set; }

    public string? Path { get; set; }
}
