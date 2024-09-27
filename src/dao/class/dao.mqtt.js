const mqtt = require('mqtt');

class MqttDAO {
  constructor() {
    this.client = mqtt.connect('mqtt://broker.emqx.io:1883');
    this.isConnected = false;
    this.isSubscribed = false;

    // Manejar la conexión inicial al broker
    this.client.on('connect', () => {
      this.isConnected = true;
    });

    // Manejar errores de conexión
    this.client.on('error', (error) => {
      console.error('Error de conexión: ' + error);
      this.isConnected = false;
    });
  }

  async sendAndReceive(topic, message, timeoutMs = 5000) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected) {
        return reject('No conectado al broker MQTT');
      }

      // Configurar el timeout para evitar que se quede esperando indefinidamente
      const timeout = setTimeout(() => {
        reject('Timeout: No se recibió respuesta dentro del tiempo límite');
      }, timeoutMs);

      // Suscribirse al tópico si no está ya suscrito
      this.client.subscribe(topic, (err) => {
        if (err) {
          clearTimeout(timeout);
          return reject('Error al suscribirse al tópico: ' + err);
        }

        this.isSubscribed = true;

        // Publicar el mensaje
        this.client.publish(topic, message, { qos: 0 }, (error) => {
          if (error) {
            clearTimeout(timeout);
            return reject('Error al publicar el mensaje: ' + error);
          }
        });
      });

      // Escuchar el mensaje de respuesta
      this.client.on('message', (receivedTopic, receivedMessage) => {
        if (receivedTopic === topic) {
          clearTimeout(timeout); // Limpiar el timeout si recibimos respuesta
          resolve(receivedMessage.toString());
        }
      });
    });
  }
}

module.exports = MqttDAO;
