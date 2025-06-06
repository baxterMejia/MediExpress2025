'use client';

import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useSelection } from '@/hooks/use-selection';

// Precio de los medicamentos
const precioMedicamento: { [key: string]: number } = {
  Paracetamol: 10000,
  Ibuprofeno: 15000,
  Amoxicilina: 20000,
  Omeprazol: 250000,
};

type Estado = 'Entregada' | 'Pendiente';

interface Solicitud {
  id: string;
  paciente: string;
  medicamentos: string[];
  estado: Estado;
  fecha: Date;
}

const medicamentosDisponibles = ['Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Omeprazol'];

export function CustomersTable(): React.JSX.Element {
  const role = sessionStorage.getItem('role') || '';
  const [rows, setRows] = React.useState<Solicitud[]>([
    {
      id: '1',
      paciente: 'Juan Pérez',
      medicamentos: ['Paracetamol'],
      estado: 'Entregada',
      fecha: new Date(),
    },
    {
      id: '2',
      paciente: 'Ana López',
      medicamentos: ['Ibuprofeno'],
      estado: 'Pendiente',
      fecha: new Date(),
    },
  ]);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newSolicitud, setNewSolicitud] = React.useState<Omit<Solicitud, 'id' | 'fecha'>>({
    paciente: '',
    medicamentos: [medicamentosDisponibles[0]],
    estado: 'Pendiente',
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rowIds = React.useMemo(() => rows.map((r) => r.id), [rows]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = selected.size > 0 && selected.size < rows.length;
  const selectedAll = rows.length > 0 && selected.size === rows.length;

  const handleAddSolicitud = () => {
    const nueva: Solicitud = {
      id: String(Date.now()),
      ...newSolicitud,
      fecha: new Date(),
    };
    setRows((prev) => [...prev, nueva]);
    setDialogOpen(false);
    setNewSolicitud({ paciente: '', medicamentos: [medicamentosDisponibles[0]], estado: 'Pendiente' });
  };

  const handleMedicamentoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value;
    setNewSolicitud((prev) => ({
      ...prev,
      medicamentos: typeof value === 'string' ? value.split(',') : value as string[],
    }));
  };


  // Calcular el valor total
  const calcularValorTotal = (medicamentos: string[]) => {
    return medicamentos.reduce((total, medicamento) => total + (precioMedicamento[medicamento] || 0), 0);
  };

  // Manejo de cambio de página
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Manejo de cambio de filas por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (role === 'admin') {
    const [stock, setStock] = React.useState([
      { nombre: 'Paracetamol', cantidad: 50 },
      { nombre: 'Ibuprofeno', cantidad: 30 },
      { nombre: 'Amoxicilina', cantidad: 20 },
      { nombre: 'Omeprazol', cantidad: 10 },
    ]);

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
    const [formData, setFormData] = React.useState({ nombre: '', cantidad: 0 });

    const handleOpenAdd = () => {
      setEditingIndex(null);
      setFormData({ nombre: '', cantidad: 0 });
      setDialogOpen(true);
    };

    const handleOpenEdit = (index: number) => {
      setEditingIndex(index);
      setFormData(stock[index]);
      setDialogOpen(true);
    };

    const handleSave = () => {
      if (editingIndex !== null) {
        // Editar existente
        setStock((prev) => {
          const updated = [...prev];
          updated[editingIndex] = formData;
          return updated;
        });
      } else {
        // Agregar nuevo
        setStock((prev) => [...prev, formData]);
      }
      setDialogOpen(false);
    };

    const handleDelete = (index: number) => {
      setStock((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <>
        <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4">Stock de Medicamentos</Typography>
          <Button variant="contained" onClick={handleOpenAdd}>Agregar Medicamento</Button>
        </Stack>

        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: '600px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Medicamento</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stock.map((item, index) => (
                  <TableRow key={item.nombre}>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleOpenEdit(index)}>Editar</Button>
                      <Button size="small" color="error" onClick={() => handleDelete(index)}>Eliminar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Card>

        {/* Diálogo para agregar/editar */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{editingIndex !== null ? 'Editar Medicamento' : 'Agregar Medicamento'}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1} sx={{ width: '300px' }}>
              <TextField
                label="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                fullWidth
              />
              <TextField
                label="Cantidad"
                type="number"
                value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value, 10) })}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} variant="contained">Guardar</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Solicitudes</Typography>
        </Stack>
      </Stack>

      <Card>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Agregar solicitud
          </Button>
        </Box>

        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      event.target.checked ? selectAll() : deselectAll();
                    }}
                  />
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Medicamentos</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Valor Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const isSelected = selected.has(row.id);
                return (
                  <TableRow hover key={row.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => (e.target.checked ? selectOne(row.id) : deselectOne(row.id))}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.paciente}</TableCell>
                    <TableCell>{row.medicamentos.join(', ')}</TableCell>
                    <TableCell>{row.estado}</TableCell>
                    <TableCell>{dayjs(row.fecha).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>${calcularValorTotal(row.medicamentos)} COP</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        <Divider />

        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />

        {/* Modal para agregar solicitud */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Agregar nueva solicitud</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1, width: '400px' }}>
              <TextField
                label="Nombre del paciente"
                value={newSolicitud.paciente}
                onChange={(e) => setNewSolicitud((prev) => ({ ...prev, paciente: e.target.value }))}
                fullWidth
              />
              <TextField
                select
                label="Medicamentos"
                value={newSolicitud.medicamentos}
                onChange={handleMedicamentoChange}
                fullWidth
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => (selected as string[]).join(', '),
                }}
              >
                {medicamentosDisponibles.map((med) => (
                  <MenuItem key={med} value={med}>
                    {med}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddSolicitud} variant="contained">
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </>
  );
}
