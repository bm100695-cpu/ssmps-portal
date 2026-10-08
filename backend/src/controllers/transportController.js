const Bus = require('../models/Bus');

// @desc    Get all buses
// @route   GET /api/transport/buses
// @access  Private
exports.getBuses = async (req, res) => {
    try {
        const buses = await Bus.find().populate('driver', 'fullName mobile');
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a bus
// @route   POST /api/transport/buses
// @access  Private/Admin
exports.createBus = async (req, res) => {
    try {
        const { busNumber, vehicleNumber, capacity, driver } = req.body;
        
        const busExists = await Bus.findOne({ busNumber });
        if (busExists) {
            return res.status(400).json({ message: 'Bus number already exists' });
        }

        const bus = await Bus.create({
            busNumber,
            vehicleNumber,
            capacity,
            driver: driver || null
        });

        res.status(201).json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update bus location (Driver app simulator)
// @route   PUT /api/transport/location/:id
// @access  Private/Driver
exports.updateLocation = async (req, res) => {
    try {
        const { lat, lng, isTracking } = req.body;
        const bus = await Bus.findById(req.params.id);

        if (bus) {
            bus.currentLocation = { lat, lng };
            if (isTracking !== undefined) bus.isTracking = isTracking;
            
            await bus.save();
            res.json(bus);
        } else {
            res.status(404).json({ message: 'Bus not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
